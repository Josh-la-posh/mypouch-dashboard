import React, {useEffect} from 'react';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import ErrorLayout from '../../../../components/ui/error_page';
import Spinner from '../../../../components/ui/spinner';
import { Link } from 'react-router-dom';

function SuspiciousLoginActivities() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, suspiciousActivities} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);

  const loginActivities = async () => {
    await adminService.fetchSuspiciousActivities(dispatch);
  }

  useEffect(() => {
    if (suspiciousActivities.length === 0) {
        loginActivities();
    }
  }, [dispatch]);
    
  useEffect(() => {
    setSettingsTitle('Suspicious Login Activities');
  }, []);

  const onRefresh = () => {
    loginActivities();
  }

  if (loading) return <Spinner />;

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh}/>;

  return (
    <div className='w-full max-w-[400px] space-y-6'>
      <div className="border py-4 px-8 space-y-3">
          <p>There is a suspicious attempt on this account</p>
          <div className="flex justify-between items-center">
              <div className="flex gap-3">
                  <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                  <p>10:00AM</p>
              </div>
              <Link
                  className='px-3 py-2 border rounded-sm'
              >
                  View
              </Link>
          </div>
      </div>
      <div className="border py-4 px-8 space-y-3">
          <p>There is a suspicious attempt on this account</p>
          <div className="flex justify-between items-center">
              <div className="flex gap-3">
                  <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                  <p>10:00AM</p>
              </div>
              <Link
                  className='px-3 py-2 border rounded-sm'
              >
                  View
              </Link>
          </div>
      </div>
    </div>
  )
}

export default SuspiciousLoginActivities;