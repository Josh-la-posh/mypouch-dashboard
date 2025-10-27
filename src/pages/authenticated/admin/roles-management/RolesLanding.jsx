import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';

const RolesLanding = () => {
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();

  useEffect(() => { setAppTitle('Admin'); }, [setAppTitle]);
  useEffect(() => { setSettingsTitle('Roles Management'); }, [setSettingsTitle]);

  return (
    <div className='lg:ml-10 lg:mt-10 space-y-4'>
      <Link
        to='/admin/roles/list'
        className='max-w-[450px] border border-gray-300 dark:border-white hover:bg-primary text-black/60 dark:text-white/70 hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
      >
        View Roles
        <ArrowRightIcon size='17px' />
      </Link>
      <Link
        to='/admin/roles/create'
        className='max-w-[450px] border border-gray-300 dark:border-white hover:bg-primary text-black/60 dark:text-white/70 hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
      >
        Create Role
        <ArrowRightIcon size='17px' />
      </Link>
    </div>
  );
};

export default RolesLanding;