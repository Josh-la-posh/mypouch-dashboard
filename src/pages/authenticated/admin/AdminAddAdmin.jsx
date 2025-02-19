import React, {useEffect, useState} from 'react'
import InputField from '../../../components/ui/input'
import Button from '../../../components/ui/button';
import useSettingsTitle from '../../../services/hooks/useSettitngsTitle';
import SelectField from '../../../components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../services/api/adminApi';
import { toast } from 'react-toastify';

function AdminAddAdmin() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [role, setRole] = useState('Admin');
  const [formData, setFormData] = useState({
    email: '',
    role: role === 'Admin' ? 'ADMIN' : 'SUPER_ADMIN',
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

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData((prev) => ({
      ...prev,
      adminRole: e.target.value
    }))
    console.log(formData);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      await adminService.addAdmin(formData, dispatch);
  }

  if (error) toast.error(error);

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-primary text-lg font-[600] text-center'>Add Admin</p>
      <div className="">
        <form onSubmit={handleSubmit} className='space-y-6'>
          <SelectField
            label='Admin Role'
            textColor='text-primary'
            options={['Super Admin', 'Admin']}
            value={role}
            onChange={handleRoleChange}
            selectClassName={'bg-primary/14 text-sm py-2'}
          />
          <InputField
            label='Email'
            textColor='text-primary'
            type='email'
            id='email'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.email}
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

export default AdminAddAdmin;