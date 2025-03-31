import {useEffect, useState} from 'react'
import InputField from '../../../../components/ui/input'
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import SelectField from '../../../../components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import useTitle from '../../../../services/hooks/useTitle';
import { CircleCheckBig } from 'lucide-react';
import { Link } from 'react-router-dom';

function AdminAddAdmin() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, isAdminSuccessful} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [role, setRole] = useState('Admin');
  const [formData, setFormData] = useState({
    email: '',
    role: role === 'Admin' ? 'ADMIN' : 'SUPER-ADMIN',
    firstName: '',
    lastName: ''
  });
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);
    
  useEffect(() => {
    setSettingsTitle('Admin Management');
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
      role: e.target.value
    }))
    console.log(formData);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.firstName === '') return;
      if (formData.lastName === '') return;
      if (formData.email === '') return;
      await adminService.addAdmin(formData, dispatch);
  }

  return (
    <div className='w-full text-primary dark:text-white'>
      {
        !isAdminSuccessful ?
        <div className="space-y-6 max-w-[400px]">
          <p className='text-lg font-[600]'>Add {formData.role === 'ADMIN' ? 'Admin' : 'Super Admin'}</p>
          <div className="">
          <form onSubmit={handleSubmit} className='space-y-6'>
            <SelectField
              label='Admin Role'
              textColor='text-primary dark:text-white'
              options={['Super Admin', 'Admin']}
              value={role}
              onChange={handleRoleChange}
              selectClassName={'bg-primary/14 text-primary text-sm border-transparent dark:border-gray-300 rounded-sm py-2'}
            />
            <InputField
              label='First Name'
              textColor='text-primary dark:text-white'
              type='text'
              id='firstName'
              inputClassName='bg-primary/14 text-sm py-2'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              label='Last Name'
              textColor='text-primary dark:text-white'
              type='text'
              id='lastName'
              inputClassName='bg-primary/14 text-sm py-2'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputField
              label='Email'
              textColor='text-primary dark:text-white'
              type='email'
              id='email'
              inputClassName='bg-primary/14 text-sm py-2'
              value={formData.email}
              onChange={handleChange}
              required
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
        </div> :
        <div className="w-full h-full flex items-center justify-center mt-10 text-primary dark:text-white">
          <div className="max-w-[400px] flex flex-col items-center justify-center space-y-7">
            <CircleCheckBig size='60px'/>
            <p className="text-lg md:text-2xl text-center">A confirmation link has been sent to the admin</p>
            <div className="w-[140px] flex justify-center">
              <Link
                to='/'
                className='text-primary text-xs md:text-sm border bg-primary-light p-2 rounded-sm'
              >
                Go to dashboard
              </Link>
            </div>
            <div className="w-[180px] flex justify-center">
              <Link
                to='/admin/all'
                className='text-primary text-xs md:text-sm border bg-primary-light p-2 rounded-sm'
              >
                Go to Admin management
              </Link>
            </div>
          </div>
      </div>
      }
    </div>
  )
}

export default AdminAddAdmin;