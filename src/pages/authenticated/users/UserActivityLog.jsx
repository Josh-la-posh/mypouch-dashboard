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
    <div className='mt-8 px-25 dark:text-white space-y-4'>
        {
            userActivity.length > 0 &&
            userActivity.map((act) => (
                <div key={act.id} className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <Vault size='18px' className='text-primary' />
                        <p className='font-[500]'>{act.activityType[0].toUpperCase() + act.activityType.slice(1)}</p>
                    </div>
                    <p className=''>{act.userAgent}</p>
                    <p className='font-[600]'>{dateAndTimeFormatter(act.createdDate)}</p>
                </div>
            ))
        }
    </div>
  )
}

export default UserActivityLog