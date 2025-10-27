import { toast } from 'react-toastify';
import { axiosPrivate } from './axios';
import { roleStart, roleSuccess, roleFailure, permissionStart, permissionSuccess, permissionFailure, roleActionStart, roleActionFinished } from '../../redux/slices/roleSlice';

class RoleService {
  async fetchRoles(dispatch) {
    try {
      dispatch(roleStart());
      // Updated endpoint per latest spec: GET /role/get
      const response = await axiosPrivate.get('/role/get');
      dispatch(roleSuccess(response.data));
    } catch (err) {
      const message = !err.response ? 'No Server Response' : (err.response.data.message || 'Error fetching roles');
      dispatch(roleFailure(message));
      toast.error(message);
    }
  }

  async fetchPermissions(dispatch) {
    try {
      dispatch(permissionStart());
      const response = await axiosPrivate.get('/permission');
      // Response format: [{ category: 'Admin Management', permissions: [ {id, slug, description}, ... ]}, ...]
      const raw = response.data || [];
      // Flatten while preserving category for grouped UI rendering
      const flattened = raw.reduce((acc, group) => {
        const { category, permissions } = group;
        if (Array.isArray(permissions)) {
          permissions.forEach(p => acc.push({ ...p, category }));
        }
        return acc;
      }, []);
      dispatch(permissionSuccess(flattened));
    } catch (err) {
      const message = !err.response ? 'No Server Response' : (err.response.data.message || 'Error fetching permissions');
      dispatch(permissionFailure(message));
      toast.error(message);
    }
  }

  async createRole(payload, dispatch) {
    try {
      dispatch(roleActionStart());
      await axiosPrivate.post('/role/create', JSON.stringify(payload));
      toast.success('Role created successfully');
      await this.fetchRoles(dispatch);
      dispatch(roleActionFinished());
    } catch (err) {
      const message = !err.response ? 'No Server Response' : (err.response.data.message || 'Error creating role');
      dispatch(roleActionFinished());
      toast.error(message);
    }
  }

  async updateRole(id, payload, dispatch) {
    try {
      dispatch(roleActionStart());
      await axiosPrivate.put(`/role/${id}/permissions`, JSON.stringify(payload));
      toast.success('Role updated successfully');
      await this.fetchRoles(dispatch);
      dispatch(roleActionFinished());
    } catch (err) {
      const message = !err.response ? 'No Server Response' : (err.response.data.message || 'Error updating role');
      dispatch(roleActionFinished());
      toast.error(message);
    }
  }

  // Fetch a single role by id by retrieving all roles then filtering (no dedicated endpoint provided)
  async fetchRole(id, dispatch) {
    try {
      dispatch(roleStart());
      const response = await axiosPrivate.get('/role/get');
      const roles = response.data || [];
      const role = roles.find(r => r.id === Number(id));
      dispatch(roleSuccess(roles)); // keep full list in store
      return role || null;
    } catch (err) {
      const message = !err.response ? 'No Server Response' : (err.response.data.message || 'Error fetching role');
      dispatch(roleFailure(message));
      toast.error(message);
      return null;
    }
  }
}

export default RoleService;