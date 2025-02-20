import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../services/hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.token?.access_token
            ? <Outlet />
            : <Navigate to='/login' state={{ from: location }} replace />
    );
}

export default RequireAuth;