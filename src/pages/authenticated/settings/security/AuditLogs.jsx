import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import Button from "../../../../components/ui/button";
import TextButton from "../../../../components/ui/textButton";
import useTitle from "../../../../services/hooks/useTitle";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import SettingsService from "../../../../services/api/settingsApi";
import Spinner from "../../../../components/ui/spinner";
import ErrorLayout from "../../../../components/ui/error_page";
import { dateFormatter } from "../../../../utils/dateFormatter";


const AuditLog = () => {
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



  const [logs] = useState([
    { user: "SuperAdmin", action: "Bankole account was disable", ip: "182.70.60.179", date: "19/02/2025 08:03:23" },
    { user: "SuperAdmin", action: "Log In", ip: "182.70.60.179", date: "19/02/2025 08:03:23" },
    { user: "SuperAdmin", action: "Bankole account was disable", ip: "182.70.60.179", date: "19/02/2025 08:03:23" },
    { user: "Admin", action: "Bankole account was disable", ip: "182.70.60.179", date: "19/02/2025 08:03:23" },
  ]);

  if (adminLogsLoading) return <Spinner />

  if (adminLogsError) return <ErrorLayout errMsg={adminLogsError} handleRefresh={onRefresh} />

  return (
    <div className="p-6 min-h-screen">
      <div className="">
        <div className="flex space-x-10 mb-4 text-gray-500 mb-10">
            <div className="space-y-2">
                <p className="text-xs">From</p>
                <div className="flex items-center">
                    <div className="mr-2 p-2 border border-gray-500 rounded-sm">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <input
                        type="date"
                        className="outline-none text-xs border border-gray-500 p-2 rounded-sm"
                        defaultValue="2025-02-18"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <p className="text-xs">To</p>
                <div className="flex items-center">
                    <div className="mr-2 p-2 border border-gray-500 rounded-sm">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <input 
                        type="date"
                        className="outline-none text-xs border border-gray-500 p-2 rounded-sm"
                        defaultValue="2025-02-18"
                    />
                </div>
            </div>
        </div>

        <div className="">
            <div className="text-xs md:text-sm lg:text-[16px] font-[600] text-black/70 dark:text-white border px-3 py-2 grid grid-cols-4">
            <span>User</span>
            <span className="text-center">Action Details</span>
            <span className="text-center">IP</span>
            <span className="text-center">Date</span>
            </div>

            {adminLogs.map((log) => (
            <div key={log.id} className="text-[9px] md:text-xs font-[600] border-b grid grid-cols-4 text-black/50 dark:text-white/60 py-4 px-3">
                <div className="flex items-center">{log?.activityType}</div>
                <div className="flex flex-col justify-center items-center gap-3">
                    {log?.description}
                    <TextButton
                    className='border py-1 px-2 rounded-sm text-[8px]'
                    >
                        Check Details
                    </TextButton>
                </div>
                <div className="flex items-center justify-center">{log?.ipAddress}</div>
                <div className="flex items-center justify-center">
                    {dateFormatter(log.createdDate)}
                </div>
            </div>
            ))}
        </div>
        <div className="flex justify-between items-center p-4">
          <span>Showing 1 to 4 out of 13</span>
          <div className="flex space-x-2">
            <Button variant="outline">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="primary">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;