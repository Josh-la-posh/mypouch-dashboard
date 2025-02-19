import React, {useEffect, useState} from 'react'
import InputField from '../../../components/ui/input'
import Button from '../../../components/ui/button';
import useSettingsTitle from '../../../services/hooks/useSettitngsTitle';
import SelectField from '../../../components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../services/api/adminApi';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

function AdminSupportiveForm() {
    const {id} = useParams();
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const {loading, error, addAdminMsg} = useSelector((state) => state.admin);
    const adminService = new AdminService(axiosPrivate);

    const [gender, setGender] = useState('Male');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        state: '',
        gender: gender === 'Male' ? 'MALE' : 'FEMALE',
        pasword: '',
        profilePicture: ''
    });
        
    useEffect(() => {
        setSettingsTitle('Add Admin');
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;

        console.log(value);

        setFormData((prev) => ({
        ...prev,
        [name]: value
        }));
    }

    const handleGenderChange = (e) => {
        setGender
        (e.target.value);
        setFormData((prev) => ({
        ...prev,
        gender: e.target.value
        }))
        console.log(formData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await adminService.updateAdmin(id, formData, dispatch);
    }

    if (error) toast.error(error);

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-primary text-lg font-[600] text-center'>Supportive Admin Form</p>
      <div className="">
        <form onSubmit={handleSubmit} className='space-y-6 grid grid-cols-3'>
            <InputField
                label='First Name'
                textColor='text-primary'
                id='firstName'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.firstName}
                onChange={handleChange}
            />
            <InputField
                label='Last Name'
                textColor='text-primary'
                id='lastName'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.lasstName}
                onChange={handleChange}
            />
            <InputField
                label='Phone Number'
                textColor='text-primary'
                type='number'
                id='phoneNumber'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.phoneNumber}
                onChange={handleChange}
            />
            <InputField
                label='Address'
                textColor='text-primary'
                id='address'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.address}
                onChange={handleChange}
            />
            <InputField
                label='State'
                textColor='text-primary'
                id='state'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.state}
                onChange={handleChange}
            />
            <SelectField
                label='Gender'
                textColor='text-primary'
                options={['Male', 'Female']}
                value={gender}
                onChange={handleGenderChange}
                selectClassName={'bg-primary/14 text-sm py-2'}
            />
            <InputField
                label='Password'
                textColor='text-primary'
                id='password'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.password}
                onChange={handleChange}
            />
            <InputField
                label='Profile Picture'
                textColor='text-primary'
                id='profilePicture'
                inputClassName='bg-primary/14 text-sm py-2'
                value={formData.profilePicture}
                onChange={handleChange}
            />
          <div className="flex gap-8">
            <Button
              variant='primary'
              disabled={loading}
            >
              {loading ? 'Submitting' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminSupportiveForm;