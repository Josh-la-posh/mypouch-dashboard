import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RoleService from '../../../../services/api/roleApi';
import Spinner from '../../../../components/ui/spinner';
import ErrorLayout from '../../../../components/ui/error_page';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { Link } from 'react-router-dom';

const RolesList = () => {
  const dispatch = useDispatch();
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const { loading, error, roles } = useSelector(state => state.role);
  const roleService = new RoleService();

  useEffect(() => { setAppTitle('Admin'); }, [setAppTitle]);
  useEffect(() => { setSettingsTitle('Roles Management'); }, [setSettingsTitle]);
  useEffect(() => { if (roles.length === 0) roleService.fetchRoles(dispatch); /* eslint-disable-line react-hooks/exhaustive-deps */ }, [dispatch, roles.length]);

  const onRefresh = () => roleService.fetchRoles(dispatch);

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <h2 className='text-black/75 dark:text-white/80 text-lg font-[600]'>All Roles</h2>
        <Link to='/admin/roles/create' className='text-xs px-3 py-2 rounded-sm bg-primary text-white'>Create Role</Link>
      </div>
      {loading && roles.length === 0 ? <Spinner /> : (
        <div className='border rounded-sm overflow-x-auto'>
          <table className='min-w-[640px] w-full text-xs'>
            <thead className='bg-primary/10 dark:bg-white/10'>
              <tr className='text-left'>
                <th className='p-2'>Name</th>
                <th className='p-2'>Description</th>
                <th className='p-2'>Permissions</th>
                <th className='p-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(r => (
                <tr key={r.id} className='border-t'>
                  <td className='p-2 font-medium'>{r.name}</td>
                  <td className='p-2'>{r.description || '-'}</td>
                  <td className='p-2'>{r.permissions?.length || 0}</td>
                  <td className='p-2'>
                    <Link to={`/admin/roles/update/${r.id}`} className='text-primary text-[11px] underline'>Update</Link>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && !loading && <tr><td className='p-2 italic' colSpan={4}>No roles found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RolesList;