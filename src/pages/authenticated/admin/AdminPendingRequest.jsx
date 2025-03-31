import { useEffect } from 'react';
import useSettingsTitle from '../../../services/hooks/useSettitngsTitle';
import useTitle from '../../../services/hooks/useTitle';

function AdminPendingRequest() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);

  useEffect(() => {
    setSettingsTitle('Pending Request');
  }, []);

  return (
    <div className='pl-4'>
      <div className="border border-gray-300 flex justify-between p-4 text-sm font-[500]">
        <div className="">
          <p className='text-primary'>Email</p>
          <p className='dark:text-white'>bankolesunday58@gmail.com</p>
        </div>
        <div className="">
          <p className='text-primary'>Types</p>
          <p className='dark:text-white'>Failed Transaction</p>
        </div>
        <div className="">
          <p className='text-primary'>Status</p>
          <p className='dark:text-white'>In Progress</p>
        </div>
        <div className="">
          <p className='text-primary'>Date</p>
          <p className='dark:text-white'>23, Jan 2025</p>
        </div>
      </div>     
    </div>
  )
}

export default AdminPendingRequest