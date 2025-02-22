import React, {useEffect} from 'react'
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import ErrorLayout from '../../../../components/ui/error_page';
import Spinner from '../../../../components/ui/spinner';
import Button from '../../../../components/ui/button';

function AllAdminPage() {
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
    setSettingsTitle('Admin Roles and Permissions');
  }, []);

  const onRefresh = () => {
    loginActivities();
  }

  if (loading) return <Spinner />;

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh}/>;

  return (
    <div className='pl-10 w-full space-y-6'>
        <div className="grid grid-cols-4 border px-3 py-2 font-[600] dark:text-white">
            <p className='col-span-2'>Name</p>
            <p className='text-center'>User Role</p>
            <p className='text-center'>Actions</p>
        </div>
        {
          allAdmin.length > 0 && 
          allAdmin.map((admin) => (
            <div key={admin.id} className="grid grid-cols-4 border px-3 py-5 bg-primary items-center text-white">
                <div className="text-lg font-[600] col-span-2">
                    <p>{admin?.firstName} {admin?.lastName}</p>
                    <p className='text-xs'>{admin?.email}</p>
                </div>
                <div className="w-full flex justify-center">
                  <div className="bg-white text-primary text-[10px] font-[600] w-[100px] h-[35px] flex items-center justify-center">
                    {admin?.role?.name}
                  </div>
                </div>
                <div className="flex justify-center h-[35px]">
                  <div className="w-[90px] h-full">
                    <Button
                      className='bg-white text-primary text-[10px] font-[600] h-full flex items-center justify-center'
                      variant='custom'
                    >
                      Modify Role
                    </Button>
                  </div>
                </div>
            </div>
          )) 
        }
    </div>
  )
}

export default AllAdminPage;