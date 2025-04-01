import { useEffect, useState } from 'react';
import InputField from '../../../../components/ui/input';
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import SelectField from '../../../../components/ui/select';
import { GENDER } from '../../../../data/gender';
import useTitle from '../../../../services/hooks/useTitle';

function AdminSupportiveForm() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const {setAppTitle} = useTitle();
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const { loading, error, addAdminMsg } = useSelector((state) => state.admin);
    const adminService = new AdminService(axiosPrivate);
    const [gender, setGender] = useState('MALE');
    const [formData, setFormData] = useState({
        phoneNumber: '',
        address: '',
        state: '',
        gender: gender,
        profilePicture: ''
    });

    useEffect(() => {
        setAppTitle('Admin');
    }, []);

    useEffect(() => {
        setSettingsTitle('Admin Management');
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenderChange = (e) => {
        setGender(e.target.value);
        setFormData((prev) => ({
            ...prev,
            gender: e.target.value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await adminService.updateAdmin(id, formData, dispatch);
    };

    if (error) toast.error(error);

    return (
        <div className="px-10 w-full space-y-6">
            <p className="text-black/75 dark:text-white/80 text-lg font-[600]">Supportive Admin Form</p>
            <form onSubmit={handleSubmit} className='w-full space-y-10'>
              <div className="grid grid-cols-2 gap-6">
                <InputField
                  id="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
                <InputField
                  id="state"
                  label="State"
                  value={formData.state}
                  onChange={handleChange}
                />
                <InputField
                  id="phoneNumber"
                  label="Phone Number"
                  type="number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <SelectField
                  label="Gender"
                  options={GENDER}
                  value={gender}
                  onChange={handleGenderChange}
                />
                <InputField
                  id="profilePicture"
                  label="Profile Picture"
                  type="file"
                  accept="image/*"                                  
                  onChange={handleImageChange}
                />
            </div>
            <div className="w-36">
              <Button variant="primary" disabled={loading}>
                {loading ? 'Submitting' : 'Submit'}
              </Button>
            </div>
          </form>
        </div>
    );
}

export default AdminSupportiveForm;
