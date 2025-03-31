import { Vault } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../services/hooks/useAxiosPrivate';
import UserService from '../../../services/api/userApi';
import Spinner from '../../../components/ui/spinner';
import ErrorLayout from '../../../components/ui/error_page';
import { dateAndTimeFormatter } from '../../../utils/dateFormatter';

function UserActivityLog({id}) {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const userService = new UserService(axiosPrivate);
    const {loading, error, userActivity} = useSelector((state) => state.user);

    const loadUserActivities = async () => {
      await userService.fetchUserActivities(id, dispatch);
    }
      
    useEffect(() => {
        loadUserActivities();
    }, [id, dispatch]);
    
    const onRefresh = () => {
    loadUserActivities();
    };

    if (loading) return <Spinner />

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className='mt-3 dark:text-white space-y-4 border border-primary rounded-md py-5'>
        <div className="grid grid-cols-3 text-sm border bg-primary dark:bg-transparent text-white dark-text-white mx-9">
            <p className='text-center'>Activities</p>
            <p className='text-center'>Date</p>
            <p className='text-center'>IP Address</p>
        </div>
        {
            userActivity.length > 0 &&
            userActivity.map((act) => (
                <div key={act.id} className="grid grid-cols-3 text-sm ">
                    <div className="flex justify-center gap-3">
                        <Vault size='18px' className='text-primary' />
                        <p className=''>{act.activityType[0].toUpperCase() + act.activityType.slice(1)}</p>
                    </div>
                    <p className='text-center font-[500]'>{dateAndTimeFormatter(act.createdDate)}</p>
                    <p className='text-center'>{act.ipAddress}</p>
                </div>
            ))
        }
    </div>
  )
}

export default UserActivityLog