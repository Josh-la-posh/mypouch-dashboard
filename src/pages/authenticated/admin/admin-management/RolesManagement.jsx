import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleService from '../../../../services/api/roleApi';
import Button from '../../../../components/ui/button';
import Spinner from '../../../../components/ui/spinner';
import ErrorLayout from '../../../../components/ui/error_page';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import CustomModal from '../../../../components/ui/custom-modal';
import { CustomTab } from '../../../../components/ui/tabs';

const RolesManagement = () => {
  const dispatch = useDispatch();
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const { loading, error, roles, permissions, actionLoading } = useSelector(state => state.role);
  const roleService = new RoleService();

  // Create Role state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [permSearch, setPermSearch] = useState('');

  // Update Role state
  const [selectedRoleId, setSelectedRoleId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updatePermissions, setUpdatePermissions] = useState([]);
  const [updateSearch, setUpdateSearch] = useState('');
  const [showRolePreview, setShowRolePreview] = useState(false);
  // Tabs state (must be before any early returns to satisfy hooks rules)
  const TABS = [
    { value: 'create', label: 'Create Role' },
    { value: 'update', label: 'Update Role' }
  ];
  const [activeTab, setActiveTab] = useState('create');

  useEffect(() => {
    setAppTitle('Roles Management');
    setSettingsTitle('Admin Management');
  }, []); // eslint-disable-line

  useEffect(() => {
    // Intentionally excluding roleService instance from deps; stable for lifecycle
    if (roles.length === 0) roleService.fetchRoles(dispatch);
    if (permissions.length === 0) roleService.fetchPermissions(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, roles.length, permissions.length]);

  const togglePermission = (id, isUpdate = false) => {
    if (isUpdate) {
      setUpdatePermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    } else {
      setSelectedPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    }
  };

  // Filter over flattened permissions then group by category
  const filteredPermissions = permissions.filter(p => p?.slug.toLowerCase().includes(permSearch?.toLowerCase()));
  const filteredUpdatePermissions = permissions.filter(p => p?.slug.toLowerCase().includes(updateSearch?.toLowerCase()));

  const groupByCategory = (list) => {
    return list.reduce((acc, perm) => {
      const cat = perm.category || 'Other';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(perm);
      return acc;
    }, {});
  };

  const groupedCreate = groupByCategory(filteredPermissions);
  const groupedUpdate = groupByCategory(filteredUpdatePermissions);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || selectedPermissions.length === 0) return;
    await roleService.createRole({ name, permissions: selectedPermissions, description }, dispatch);
    setName('');
    setDescription('');
    setSelectedPermissions([]);
    setPermSearch('');
  };

  const handleRoleSelect = (e) => {
    const id = Number(e.target.value);
    setSelectedRoleId(id);
    const role = roles.find(r => r.id === id);
    if (role) {
      setUpdateName(role.name);
      setUpdatePermissions(role.permissions.map(p => p.id));
    } else {
      setUpdateName('');
      setUpdatePermissions([]);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedRoleId || !updateName || updatePermissions.length === 0) return;
    await roleService.updateRole(selectedRoleId, { name: updateName, permissions: updatePermissions }, dispatch);
  };

  const onRefresh = () => {
    roleService.fetchRoles(dispatch);
    roleService.fetchPermissions(dispatch);
  };

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  return (
    <div className='space-y-8'>
      <p className='text-black/75 dark:text-white/80 text-lg font-[600]'>Roles & Permissions</p>
      {loading && roles.length === 0 && permissions.length === 0 && <Spinner />}
      <CustomTab 
        TABS={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        {activeTab === 'create' && (
          <form onSubmit={handleCreate} className='space-y-6 max-w-[700px]'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <p className='text-xs'>Role Name</p>
                <input
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full'
                  placeholder='e.g. SUPPORT ADMIN'
                  required
                />
              </div>
              <div className='space-y-2'>
                <p className='text-xs'>Description (optional)</p>
                <input
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full'
                  placeholder='Short description'
                />
              </div>
            </div>
            <div className='space-y-3'>
              <div className='flex items-center justify-between'>
                <p className='text-xs font-semibold'>Select Permissions</p>
                <input
                  type='text'
                  value={permSearch}
                  onChange={(e) => setPermSearch(e.target.value)}
                  placeholder='Search permission slug'
                  className='border text-xs px-3 py-1 rounded-sm outline-none dark:bg-transparent'
                />
              </div>
              <div className='max-h-[320px] overflow-y-auto border rounded-sm p-2 space-y-4 text-xs'>
                {loading && permissions.length === 0 ? <Spinner /> : (
                  Object.keys(groupedCreate).map(cat => (
                    <div key={cat} className='space-y-2'>
                      <p className='text-[11px] font-semibold bg-primary/5 dark:bg-white/5 px-2 py-1 rounded-sm'>{cat}</p>
                      <div className='grid md:grid-cols-2 gap-2'>
                        {groupedCreate[cat].map(p => (
                          <label key={p.id} className='flex items-start gap-2 cursor-pointer'>
                            <input
                              type='checkbox'
                              checked={selectedPermissions.includes(p.id)}
                              onChange={() => togglePermission(p.id)}
                            />
                            <span className='flex-1'>
                              <span className='font-medium'>{p.slug}</span>
                              <span className='block text-[10px] opacity-70'>{p.description}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))
                )}
                {filteredPermissions.length === 0 && !loading && <p className='text-[10px] italic'>No permissions match your search.</p>}
              </div>
              <p className='text-[10px] opacity-70'>Selected: {selectedPermissions.length}</p>
            </div>
            <Button disabled={actionLoading} variant='primary'>
              {actionLoading ? 'Creating...' : 'Create Role'}
            </Button>
            </form>
        )}
        {activeTab === 'update' && (
          <form onSubmit={handleUpdate} className='space-y-6 max-w-[700px]'>
            <div className='grid md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <p className='text-xs'>Select Role</p>
                <select
                  value={selectedRoleId}
                  onChange={handleRoleSelect}
                  className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full'
                >
                  <option value=''>-- Choose a role --</option>
                  {roles.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                </select>
              </div>
              <div className='space-y-2'>
                <p className='text-xs'>Role Name</p>
                <input
                  type='text'
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                  className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full'
                  disabled={!selectedRoleId}
                  placeholder='Role name'
                  required
                />
              </div>
            </div>
            {selectedRoleId && (
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <p className='text-xs font-semibold'>Update Permissions</p>
                  <input
                    type='text'
                    value={updateSearch}
                    onChange={(e) => setUpdateSearch(e.target.value)}
                    placeholder='Search permission slug'
                    className='border text-xs px-3 py-1 rounded-sm outline-none dark:bg-transparent'
                  />
                </div>
                <div className='max-h-[320px] overflow-y-auto border rounded-sm p-2 space-y-4 text-xs'>
                  {Object.keys(groupedUpdate).map(cat => (
                    <div key={cat} className='space-y-2'>
                      <p className='text-[11px] font-semibold bg-primary/5 dark:bg-white/5 px-2 py-1 rounded-sm'>{cat}</p>
                      <div className='grid md:grid-cols-2 gap-2'>
                        {groupedUpdate[cat].map(p => (
                          <label key={p.id} className='flex items-start gap-2 cursor-pointer'>
                            <input
                              type='checkbox'
                              checked={updatePermissions.includes(p.id)}
                              onChange={() => togglePermission(p.id, true)}
                            />
                            <span className='flex-1'>
                              <span className='font-medium'>{p.slug}</span>
                              <span className='block text-[10px] opacity-70'>{p.description}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  {filteredUpdatePermissions.length === 0 && <p className='text-[10px] italic'>No permissions match your search.</p>}
                </div>
                <p className='text-[10px] opacity-70'>Selected: {updatePermissions.length}</p>
                <div className='flex gap-2'>
                  <Button type='button' variant='secondary' className='text-xs' onClick={() => setShowRolePreview(true)}>Preview</Button>
                  <Button disabled={actionLoading} variant='primary' className='text-xs'>
                    {actionLoading ? 'Updating...' : 'Update Role'}
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}
      </CustomTab>

      <CustomModal isOpen={showRolePreview} title='Role Preview' onClose={() => setShowRolePreview(false)}>
        <div className='space-y-4 text-xs'>
          <p><span className='font-semibold'>Name:</span> {updateName}</p>
          <p><span className='font-semibold'>Permissions ({updatePermissions.length}):</span></p>
          <ul className='list-disc pl-4 space-y-1 max-h-[200px] overflow-y-auto'>
            {updatePermissions.map(pid => {
              const perm = permissions.find(p => p.id === pid);
              return <li key={pid}>{perm?.slug} <span className='opacity-60'>- {perm?.description}</span></li>;
            })}
          </ul>
        </div>
      </CustomModal>
    </div>
  );
};

export default RolesManagement;