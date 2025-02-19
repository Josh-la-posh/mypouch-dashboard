import React, { useEffect } from 'react'
import useSettingsTitle from '../../../services/hooks/useSettitngsTitle';

function AdminManagement() {
  const { setSettingsTitle } = useSettingsTitle();
    
  useEffect(() => {
    setSettingsTitle('Admin Management');
  }, []);
  return (
    <div>AdminManagement</div>
  )
}

export default AdminManagement