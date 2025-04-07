import { useDispatch } from "react-redux";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import useTitle from "../../../../services/hooks/useTitle";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../../services/api/adminApi";
import { useEffect } from "react";
import { CircleCheckBig, Cloud } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../../components/ui/button";

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
        <div className="w-full h-full flex flex-col items-center justify-center space-y-10">
            <CircleCheckBig size='90px' className="text-green-600"/>
            <div className="space-y-4 text-center">
                <p className="text-lg md:text-2xl font-[700] text-black dark:text-white">Success</p>
                <p className="text-sm md:text-md text-black/60 dark:text-white/40">Deposit Request Successful</p>
            </div>
            <div className="">
            <Link
                to='/admin/pouch-wallet'
                className='text-white text-xs md:text-sm border bg-primary py-2 px-4 rounded-sm'
              >
                Go to Pouch Wallet
              </Link>
            </div>
        </div>
    )

}

export default PouchFundingSuccess;