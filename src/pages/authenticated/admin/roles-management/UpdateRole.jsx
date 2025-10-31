import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RoleService from '../../../../services/api/roleApi';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import Button from '../../../../components/ui/button';
import Spinner from '../../../../components/ui/spinner';
import ErrorLayout from '../../../../components/ui/error_page';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import CustomModal from '../../../../components/ui/custom-modal';

const UpdateRole = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const { loading, error, roles, permissions, actionLoading } = useSelector(state => state.role);
  const axiosPrivate = useAxiosPrivate();
  const roleService = useMemo(() => new RoleService(axiosPrivate), [axiosPrivate]);

  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [search, setSearch] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => { setAppTitle('Admin'); }, [setAppTitle]);
  useEffect(() => { setSettingsTitle('Roles Management'); }, [setSettingsTitle]);

  useEffect(() => {
    if (permissions.length === 0) roleService.fetchPermissions(dispatch);
  }, [dispatch, permissions.length, roleService]);

  useEffect(() => {
    // Ensure roles are loaded then set local state
    const init = async () => {
      if (roles.length === 0) await roleService.fetchRoles(dispatch);
      const r = roles.find(r => r.id === Number(id));
      if (r) {
        setRoleName(r.name);
        setSelectedPermissions(r.permissions.map(p => p.id));
      }
    };
    init();
  }, [dispatch, id, roles, roleService]);

  const toggle = (pid) => {
    setSelectedPermissions(prev => prev.includes(pid) ? prev.filter(p => p !== pid) : [...prev, pid]);
  };

  const filtered = permissions.filter(p => p.slug.toLowerCase().includes(search.toLowerCase()));
  const groupByCategory = (list) => list.reduce((acc, perm) => {
    const cat = perm.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(perm);
    return acc;
  }, {});
  const grouped = groupByCategory(filtered);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!roleName || selectedPermissions.length === 0) return;
    await roleService.updateRole(id, { name: roleName, permissions: selectedPermissions }, dispatch);
  };

  const onRefresh = () => roleService.fetchRoles(dispatch);

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  return (
    <div className='space-y-6 max-w-[760px]'>
      <h2 className='text-black/75 dark:text-white/80 text-lg font-[600]'>Update Role</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='space-y-2'>
          <p className='text-xs'>Role Name</p>
          <input
            type='text'
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full'
            placeholder='Role name'
            required
          />
        </div>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <p className='text-xs font-semibold'>Permissions</p>
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
        <div className='flex gap-2'>
          <Button type='button' variant='secondary' className='text-xs' onClick={() => setShowPreview(true)}>Preview</Button>
          <Button disabled={actionLoading} variant='primary'>
            {actionLoading ? 'Updating...' : 'Update Role'}
          </Button>
        </div>
      </form>
      <CustomModal isOpen={showPreview} title='Role Preview' onClose={() => setShowPreview(false)}>
        <div className='space-y-4 text-xs'>
          <p><span className='font-semibold'>Name:</span> {roleName}</p>
          <p><span className='font-semibold'>Permissions ({selectedPermissions.length}):</span></p>
          <ul className='list-disc pl-4 space-y-1 max-h-[200px] overflow-y-auto'>
            {selectedPermissions.map(pid => {
              const perm = permissions.find(p => p.id === pid);
              return <li key={pid}>{perm?.slug} <span className='opacity-60'>- {perm?.description}</span></li>;
            })}
          </ul>
        </div>
      </CustomModal>
    </div>
  );
};

export default UpdateRole;