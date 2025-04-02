import { useEffect } from "react";
import TextButton from "../../../../components/ui/textButton";
import useTitle from "../../../../services/hooks/useTitle";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import SettingsService from "../../../../services/api/settingsApi";
import Spinner from "../../../../components/ui/spinner";
import ErrorLayout from "../../../../components/ui/error_page";
import { dateFormatter } from "../../../../utils/dateFormatter";


const LoginLog = () => {
    const {setAppTitle} = useTitle();
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const {adminLogsLoading, adminLogsError, adminLogs} = useSelector((state) => state.setting);
    const settingService = new SettingsService(axiosPrivate);

    const loadAdminLogs = async () => {
        await settingService.fetchAdminLogs(dispatch);
    }
        
    useEffect(() => {
        setAppTitle('Settings');
    }, []);

    useEffect(() => {
        setSettingsTitle('Security Settings');
    }, []);

    useEffect(() => {
        loadAdminLogs();
    }, [dispatch]);

    const onRefresh = () => {
        loadAdminLogs();
    };

  if (adminLogsLoading) return <Spinner />

  if (adminLogsError) return <ErrorLayout errMsg={adminLogsError} handleRefresh={onRefresh} />

  return (
    <div className="min-h-screen">
        <h2 className="mb-5 dark:text-white font-[600] text-md md:text-lg">Login Logs</h2>
        <div className="text-xs md:text-sm lg:text-[16px] font-[600] text-black/70 dark:text-white border px-3 py-2 grid grid-cols-4">
        <span>User</span>
        <span className="text-center">Action Details</span>
        <span className="text-center">IP</span>
        <span className="text-center">Date</span>
        </div>

        {adminLogs.map((log) => (
        <div key={log.id} className="text-[9px] md:text-xs font-[600] border-b grid grid-cols-4 text-black/50 dark:text-white/60 py-4 px-3">
            <div className="">{log?.activityType[0].toUpperCase()}{log?.activityType.substring(1)}</div>
            <div className="text-center gap-3">
                {log?.description}
                {/* <TextButton
                className='border py-1 px-2 rounded-sm text-[8px]'
                >
                    Check Details
                </TextButton> */}
            </div>
            <div className="text-center justify-center">{log?.ipAddress}</div>
            <div className="text-center justify-center">
                {dateFormatter(log.createdDate)}
            </div>
        </div>
        ))}
    </div>
  );
};

export default LoginLog;