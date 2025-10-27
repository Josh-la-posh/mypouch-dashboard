import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import RolesLanding from '../roles-management/RolesLanding';
import AllAdminPage from './AllAdmin';

// Simple tab button component
const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-xs md:text-sm font-semibold border-b-2 transition-colors duration-150 ${active ? 'border-primary text-primary' : 'border-transparent text-black/60 dark:text-white/60 hover:text-primary'}`}
  >
    {children}
  </button>
);

TabButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node
};

function AdminManagementPage() {
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const [activeTab, setActiveTab] = useState('admins'); // 'admins' | 'roles'

  useEffect(() => {
    setAppTitle('Admin');
    setSettingsTitle('Admin Management');
  }, [setAppTitle, setSettingsTitle]);

  return (
    <div className='h-full w-full flex flex-col'>
      {/* Tabs */}
      <div className='flex items-center gap-4 border-b border-black/10 dark:border-white/10 mb-6'>
        <TabButton active={activeTab === 'admins'} onClick={() => setActiveTab('admins')}>All Admins</TabButton>
        <TabButton active={activeTab === 'roles'} onClick={() => setActiveTab('roles')}>Roles Management</TabButton>
      </div>

      {/* Content */}
      <div className='flex-1 overflow-auto'>
        {activeTab === 'admins' && (
          <AllAdminPage />
        )}
        {activeTab === 'roles' && (
          <RolesLanding />
        )}
      </div>
    </div>
  );
}

export default AdminManagementPage;
