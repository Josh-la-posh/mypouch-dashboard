import React, {useEffect, useState} from 'react'
import InputField from '../../../../components/ui/input'
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import { toast } from 'react-toastify';
import ErrorLayout from '../../../../components/ui/error_page';
import Spinner from '../../../../components/ui/spinner';
import TextButton from '../../../../components/ui/textButton';
import { Link } from 'react-router-dom';

function RolesAndPermission() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, rolesAndPermissions} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);

  const loginActivities = async () => {
    await adminService.fetchSuspiciousActivities(dispatch);
  }

  useEffect(() => {
    if (rolesAndPermissions.length === 0) {
        loginActivities();
    }
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
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
        <div className="grid grid-cols-3 border px-3 py-2">
            <p>Name</p>
            <p>User Role</p>
            <p>Actions</p>
        </div>
        <div className="grid grid-cols-3 border px-3 py-5 bg-primary items-center">
            <div className="">
                <p>Bankole Isaac</p>
                <p>bankole</p>
            </div>
            <div className="">Super Admin</div>
            <div className="">Modify Role</div>
        </div>
    </div>
  )
}

export default RolesAndPermission;