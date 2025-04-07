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
  const {loading, isAdminSuccessful, adminRoles} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [role, setRole] = useState('Admin');
  const [formData, setFormData] = useState({
    email: '',
    role: role,
    firstName: '',
    lastName: ''
  });
  
  const fetchAdminRoles = async () => {
    await adminService.fetchAllAdminRoles(dispatch);
  }
  
    useEffect(() => {
      if (adminRoles.length === 0) {
        fetchAdminRoles();
      }
    }, [dispatch, adminRoles]);
    
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
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.firstName === '') return;
      if (formData.lastName === '') return;
      if (formData.email === '') return;
      await adminService.addAdmin(formData, dispatch);
  }

  return (
    <div className='w-full'>
      {
        !isAdminSuccessful ?
        <div className="space-y-6 max-w-[400px]">
          <p className='text-black/75 dark:text-white/80 text-lg font-[600]'>Add {formData.role === 'ADMIN' ? 'Admin' : 'Super Admin'}</p>
          <div className="">
          <form onSubmit={handleSubmit} className='space-y-6'>
            <SelectField
              label='Admin Role'
              options={adminRoles?.map(item => item?.name)}
              value={role}
              onChange={handleRoleChange}
            />
            <InputField
              label='First Name'
              type='text'
              id='firstName'
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <InputField
              label='Last Name'
              type='text'
              id='lastName'
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <InputField
              label='Email'
              type='email'
              id='email'
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