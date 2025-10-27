import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleService from '../../../../services/api/roleApi';
import Button from '../../../../components/ui/button';
import Spinner from '../../../../components/ui/spinner';
import ErrorLayout from '../../../../components/ui/error_page';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';

const CreateRole = () => {
  const dispatch = useDispatch();
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const { loading, error, permissions, actionLoading } = useSelector(state => state.role);
  const roleService = new RoleService();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { setAppTitle('Admin'); }, [setAppTitle]);
  useEffect(() => { setSettingsTitle('Roles Management'); }, [setSettingsTitle]);
  useEffect(() => { if (permissions.length === 0) roleService.fetchPermissions(dispatch); /* eslint-disable-line */ }, [dispatch, permissions.length]);

  const toggle = (id) => {
    setSelectedPermissions(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const groupByCategory = (list) => list.reduce((acc, perm) => {
    const cat = perm.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(perm);
    return acc;
  }, {});

  const filtered = permissions.filter(p => p.slug.toLowerCase().includes(search.toLowerCase()));
  const grouped = groupByCategory(filtered);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || selectedPermissions.length === 0) return;
    await roleService.createRole({ name, permissions: selectedPermissions, description }, dispatch);
    setName('');
    setDescription('');
    setSelectedPermissions([]);
    setSearch('');
  };

  const onRefresh = () => roleService.fetchPermissions(dispatch);

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  return (
    <div className='space-y-6 max-w-[760px]'>
      <h2 className='text-black/75 dark:text-white/80 text-lg font-[600]'>Create Role</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder='Search permission slug'
              className='border text-xs px-3 py-1 rounded-sm outline-none dark:bg-transparent'
            />
          </div>
          <div className='max-h-[360px] overflow-y-auto border rounded-sm p-2 space-y-4 text-xs'>
            {loading && permissions.length === 0 ? <Spinner /> : (
              Object.keys(grouped).map(cat => (
                <div key={cat} className='space-y-2'>
                  <p className='text-[11px] font-semibold bg-primary/5 dark:bg-white/5 px-2 py-1 rounded-sm'>{cat}</p>
                  <div className='grid md:grid-cols-2 gap-2'>
                    {grouped[cat].map(p => (
                      <label key={p.id} className='flex items-start gap-2 cursor-pointer'>
                        <input
                          type='checkbox'
                          checked={selectedPermissions.includes(p.id)}
                          onChange={() => toggle(p.id)}
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
            {filtered.length === 0 && !loading && <p className='text-[10px] italic'>No permissions match your search.</p>}
          </div>
          <p className='text-[10px] opacity-70'>Selected: {selectedPermissions.length}</p>
        </div>
        <Button disabled={actionLoading} variant='primary'>
          {actionLoading ? 'Creating...' : 'Create Role'}
        </Button>
      </form>
    </div>
  );
};

export default CreateRole;