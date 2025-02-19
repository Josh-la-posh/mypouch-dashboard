import React, {useEffect, useState} from 'react'
import InputField from '../../../../components/ui/input'
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import { toast } from 'react-toastify';

function AdminChangePassword() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
    
  useEffect(() => {
    setSettingsTitle('Change Password');
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminService.changePassword(formData, dispatch);
    setFormData({});
  }

  if (error) toast.error(error);

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-primary text-xl font-[600] '>Change Password</p>
      <div className="">
        <form onSubmit={handleSubmit} className='space-y-6'>
          <InputField
            label='Current Password'
            textColor='text-primary'
            id='currentPassword'
            placeholder='Enter current password'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <InputField
            label='New Password'
            textColor='text-primary'
            id='newPassword'
            placeholder='Enter new password'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.newPassword}
            onChange={handleChange}
          />
          <InputField
            label='Confirm Password'
            textColor='text-primary'
            id='confirmPassword'
            placeholder='Re-enter new password'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <div className="flex gap-8">
            <Button
              variant='primary'
              disabled={loading}
            >
              {loading ? 'Saving' : 'Done'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminChangePassword;