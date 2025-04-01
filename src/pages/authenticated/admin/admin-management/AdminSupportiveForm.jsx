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

function AdminSupportiveForm() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
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
        setSettingsTitle('Add Admin');
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
                    profilePicture: reader.result // base64 string
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
        <div className="pl-10 w-full space-y-6">
            <p className="text-primary text-lg font-[600]">Supportive Admin Form</p>
            <form onSubmit={handleSubmit} className='w-full'>
              <div className="space-y-6 grid grid-cols-3 gap-6">
                <InputField
                  id="address"
                  label="Address"
                  textColor="text-primary dark:text-white"
                  value={formData.address}
                  onChange={handleChange}
                  inputClassName="bg-primary/14 text-sm py-2"
                />
                <InputField
                  id="state"
                  label="State"
                  textColor="text-primary dark:text-white"
                  value={formData.state}
                  onChange={handleChange}
                  inputClassName="bg-primary/14 text-sm py-2"
                />
                <InputField
                  id="phoneNumber"
                  label="Phone Number"
                  textColor="text-primary dark:text-white"
                  type="number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  inputClassName="bg-primary/14 text-sm py-2"
                />
                <SelectField
                  label="Gender"
                  textColor="text-primary dark:text-white"
                  options={GENDER}
                  value={gender}
                  onChange={handleGenderChange}
                  selectClassName="bg-primary/14"
                />
                <div className="col-span-2 flex flex-col gap-2">
                  <InputField
                    id="profilePicture"
                    label="Profile Picture"
                    textColor="text-primary dark:text-white"
                    type="file"
                    accept="image/*"                                  
                    onChange={handleImageChange}
                    inputClassName="bg-primary/14 text-sm py-2"
                  />
                  {/* {formData.profilePicture && (
                    <img src={formData.profilePicture} alt="Profile Preview" className="mt-2 w-32 h-32 object-cover" />
                  )} */}
                </div>
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
