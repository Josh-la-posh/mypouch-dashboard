import React, {useEffect} from 'react'
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import ErrorLayout from '../../../../components/ui/error_page';
import Spinner from '../../../../components/ui/spinner';
import Button from '../../../../components/ui/button';
import { Link } from 'react-router-dom';
import useTitle from '../../../../services/hooks/useTitle';
import TextButton from '../../../../components/ui/textButton';
import { Edit3Icon } from 'lucide-react';

function AllAdminPage() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, allAdmin} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);

  const loginActivities = async () => {
    await adminService.fetchAllAdmin(dispatch);
  }

  useEffect(() => {
    loginActivities();
  }, [dispatch]);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);
    
  useEffect(() => {
    setSettingsTitle('Admin Management');
  }, []);

  const onRefresh = () => {
    loginActivities();
  }

  if (loading) return <Spinner />;

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh}/>;

  return (
    <div className='h-full'>
      <div className="w-full flex justify-end mb-10">
        <Link
          to='/admin/add-admin'
          className="bg-primary text-xs md:text-sm text-center font-[600] py-2 md:py-3 px-4 md:px-6 text-white rounded-sm"
        >
          Add Admin
        </Link>
      </div>
      <div className='w-full space-y-6 text-sm md:text-md'>
        <div className="font-[600] text-black/70 dark:text-white grid grid-cols-4 border border-primary px-3 py-2">
          <p className='col-span-2'>Name</p>
          <p className='text-center'>User Role</p>
          <p className='text-center'>Actions</p>
        </div>
        {
          allAdmin.length > 0 && 
          allAdmin.map((admin) => (
            <div key={admin.id} className="grid grid-cols-4 items-center text-black/50 dark:text-white/60 px-3">
              <div className="col-span-2">
                  <p className='text-md font-[600]'>{admin?.firstName} {admin?.lastName}</p>
                  <p className='text-xs font-[400]'>{admin?.email}</p>
              </div>
              <div className="text-xs font-[600] text-center">
                {admin?.role?.name}
              </div>
              <div className="flex">
                <TextButton>
                  <Edit3Icon />
                </TextButton>
              </div>
            </div>
          )) 
          }
      </div>
    </div>
  )
}

export default AllAdminPage;