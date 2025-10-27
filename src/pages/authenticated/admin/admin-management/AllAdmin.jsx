import {useEffect, useState, useCallback, useMemo} from 'react'
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import ErrorLayout from '../../../../components/ui/error_page';
import Spinner from '../../../../components/ui/spinner';
import { Link } from 'react-router-dom';
import useTitle from '../../../../services/hooks/useTitle';
import TextButton from '../../../../components/ui/textButton';
import { Edit3Icon } from 'lucide-react';
import useAuth from '../../../../services/hooks/useAuth';
import SelectField from '../../../../components/ui/select';
import CustomModal from '../../../../components/ui/custom-modal';
import Button from '../../../../components/ui/button';
import { toast } from 'react-toastify';

function AllAdminPage() {
  const {auth} = useAuth();
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, isActivatingAdmin, error, allAdmin, adminRoles} = useSelector((state) => state.admin);
  const adminService = useMemo(() => new AdminService(axiosPrivate), [axiosPrivate]);
  const [selectedId, setSelectedId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const onClose = () => setIsModalOpen(false);

  const onOpen = (id, option) => {
    setSelectedOption(option)
    setSelectedId(id);
    setIsModalOpen(true);
  }

  const loginActivities = useCallback(async () => {
    await adminService.fetchAllAdmin(dispatch);
  }, [adminService, dispatch]);
  
  const fetchAdminRoles = useCallback(async () => {
    await adminService.fetchAllAdminRoles(dispatch);
  }, [adminService, dispatch]);
  
  const updateAdminRoles = async (id) => {
    await adminService.updateAdminRole(id, selectedRole, dispatch);
    setSelectedId('');
  }

  const blockAdmin = async (id) => {
    await adminService.blockAdmin(id, dispatch);
  }

  const unblockAdmin = async (id) => {
    await adminService.unblockAdmin(id, dispatch);
  }

  const deactivateAdmin = async (id) => {
    await adminService.deactivateAdmin(id, dispatch);
  }

  const deleteAdmin = async (id) => {
    await adminService.deleteAdmin(id, dispatch);
  }

  const activateAdmin = async (id) => {
    await adminService.activateAdmin(id, dispatch);
  }

  const handleOnEdit = (id) => {
    if (id === selectedId) {
      setSelectedId('');
    } else {
      setSelectedId(id);
    }
  }

  const handleAction = async () => {
    try {
      if (selectedOption === 'edit') {
        await updateAdminRoles(selectedId);
      } else if (selectedOption === 'block') {
        await blockAdmin(selectedId);
      } else if (selectedOption === 'unblock') {
        await unblockAdmin(selectedId);
      } else if (selectedOption === 'deactivate') {
        await deactivateAdmin(selectedId);
      } else if (selectedOption === 'delete') {
        await deleteAdmin(selectedId);
      } else if (selectedOption === 'activate') {
        await activateAdmin(selectedId);
      }
      setSelectedOption('');
      setIsModalOpen(false);
      toast.success('Successful');
    } catch (e) {
      console.log('Error performing action:', e);
    }
  }

  useEffect(() => {
    loginActivities();
  }, [loginActivities]);

  useEffect(() => {
    fetchAdminRoles();
  }, [fetchAdminRoles]);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, [setAppTitle]);
    
  useEffect(() => {
    setSettingsTitle('Admin Management');
  }, [setSettingsTitle]);

  const onRefresh = () => {
    loginActivities();
  }

  if (loading && !isActivatingAdmin) return <Spinner />;

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
      <div className='w-full space-y-6 text-xs md:text-sm lg:text-[16px]'>
        <div className={`font-[600] text-black/70 dark:text-white grid ${auth?.data?.role?.name === 'SUPER ADMIN' ? 'grid-cols-5' : 'grid-cols-4'} border border-primary px-3 py-2`}>
          <p className='col-span-2'>Name</p>
          <p className='text-center'>Role</p>
          <p className='text-center'>Status</p>
          {auth?.data?.role?.name === 'SUPER ADMIN' && <p className='text-center'>Action</p>}
        </div>
        {
          allAdmin.length > 0 && 
          allAdmin.map((admin) => (
            <div key={admin.id} className="">
              <div className={`grid ${auth?.data?.role?.name === 'SUPER ADMIN' ? 'grid-cols-5' : 'grid-cols-4'} items-center text-black/50 dark:text-white/60 px-3`}>
                <div className="col-span-2">
                    <p className='font-[600]'>{admin?.firstName} {admin?.lastName}</p>
                    <p className='text-[9px] md:text-[11px] font-[400]'>{admin?.email}</p>
                </div>
                <div className="text-[9px] md:text-xs font-[600] text-center">
                  {admin?.role?.name}
                </div>
                <div className="flex items-center justify-center">
                  <span className={`px-2 py-1 rounded-sm text-[9px] md:text-xs font-semibold uppercase ${
                    admin?.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300' :
                    admin?.status.toLowerCase() === 'inactive' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300' :
                    admin?.status.toLowerCase() === 'blocked' ? 'bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300' :
                    admin?.status.toLowerCase() === 'deleted' ? 'bg-gray-200 text-gray-700 dark:bg-gray-700/30 dark:text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {admin?.status.toLowerCase() || 'unknown'}
                  </span>
                </div>
                {
                  auth?.data?.role?.name === 'SUPER ADMIN' &&
                  <div className="flex items-center justify-center gap-3">
                    {admin?.status.toLowerCase() !== 'deleted' && (
                      <TextButton onClick={() => handleOnEdit(admin?.id)}>
                        <Edit3Icon size='14px' className='text-blue-500' />
                      </TextButton>
                    )}
                    {admin?.status.toLowerCase() === 'active' && (
                      <>
                        <TextButton onClick={() => onOpen(admin?.id, 'block')}>Block</TextButton>
                        <TextButton onClick={() => onOpen(admin?.id, 'deactivate')}>Deactivate</TextButton>
                      </>
                    )}
                    {admin?.status.toLowerCase() === 'blocked' && (
                      <>
                        <TextButton onClick={() => onOpen(admin?.id, 'unblock')}>Unblock</TextButton>
                        <TextButton onClick={() => onOpen(admin?.id, 'deactivate')}>Deactivate</TextButton>
                        <TextButton onClick={() => onOpen(admin?.id, 'activate')}>Activate</TextButton>
                      </>
                    )}
                    {admin?.status.toLowerCase() === 'inactive' && (
                      <>
                        <TextButton onClick={() => onOpen(admin?.id, 'activate')}>Activate</TextButton>
                        <TextButton onClick={() => onOpen(admin?.id, 'delete')}>Delete</TextButton>
                      </>
                    )}
                  </div>
                }
              </div>
              {selectedId === admin?.id && 
                (<div className="flex items-center justify-end gap-4 my-5 mr-10">
                  <SelectField
                    options={adminRoles?.map(item => ({ label: item?.name, value: item?.id }))}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  />
                  <div className="">
                    <TextButton
                      // onClick={() => updateAdminRoles(admin?.id)}
                      onClick={() => onOpen(admin?.id, 'edit')}
                    >
                      {isActivatingAdmin ? 'Updating ...' : 'Update'}
                    </TextButton>
                  </div>
                </div>)
              }
            </div>
          )) 
        }
      </div>
      <CustomModal
        title={(() => {
          switch (selectedOption) {
            case 'edit': return 'Confirm role change?';
            case 'block': return 'Block this admin?';
            case 'unblock': return 'Unblock this admin?';
            case 'activate': return 'Activate this admin?';
            case 'deactivate': return 'Deactivate this admin?';
            case 'delete': return 'Delete this admin? This action may be irreversible.';
            default: return 'Confirm action?';
          }
        })()}
        isOpen={isModalOpen}
        onClose={onClose}
      >
        <div className="flex justify-center gap-10">
          <Button
            variant="primary"
            onClick={handleAction}
          >
            {isActivatingAdmin ? 'Processing...' : 'Confirm'}
          </Button>
          <Button
            variant="danger"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </CustomModal>
    </div>
  )
}

export default AllAdminPage;