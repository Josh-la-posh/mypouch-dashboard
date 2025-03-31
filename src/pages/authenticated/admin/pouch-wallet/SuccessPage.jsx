import { useDispatch } from "react-redux";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import useTitle from "../../../../services/hooks/useTitle";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../../services/api/adminApi";
import { useEffect } from "react";
import { CircleCheckBig, Cloud } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PouchFundingSuccess() {
    const {setAppTitle} = useTitle();
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const adminService = new AdminService(axiosPrivate, navigate);
    
    useEffect(() => {
        setAppTitle('Admin');
    }, []);

    useEffect(() => {
        setSettingsTitle('Pouch Wallet');
    }, []);
    
    const loadCurrencies = async (cur) => {
        await adminService.fetchAdminWallets(cur, dispatch);
    }

    useEffect(() => {
        loadCurrencies('');
    }, [dispatch]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-primary dark:text-white space-y-7">
            <CircleCheckBig size='60px'/>
            <p className="text-lg md:text-2xl">Deposit Successful!</p>
        </div>
    )

}

export default PouchFundingSuccess;