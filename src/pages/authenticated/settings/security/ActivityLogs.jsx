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


const ActivityLog = () => {
    const {setAppTitle} = useTitle();
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const {activityLogsLoading, activityLogsError, activityLogs} = useSelector((state) => state.setting);
    const settingService = new SettingsService(axiosPrivate);

    const loadActivityLogs = async () => {
        await settingService.fetchActivityLogs(dispatch);
    }
        
    useEffect(() => {
        setAppTitle('Settings');
    }, []);

    useEffect(() => {
        setSettingsTitle('Security Settings');
    }, []);

    useEffect(() => {
        loadActivityLogs();
    }, [dispatch]);

    const onRefresh = () => {
        loadActivityLogs();
    };

  if (activityLogsLoading) return <Spinner />

  if (activityLogsError) return <ErrorLayout errMsg={activityLogsError} handleRefresh={onRefresh} />

  return (
    <div className="min-h-screen">
        <h2 className="mb-5 dark:text-white font-[600] text-md md:text-lg">Activity Log</h2>
        {/* <div className="flex space-x-10 mb-4 text-gray-500 mb-10">
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
        </div> */}

        <div className="">
            <div className="text-xs md:text-sm lg:text-[16px] font-[600] text-black/70 dark:text-white border px-3 py-2 grid grid-cols-4">
            <span>User</span>
            <span className="text-center">Action Details</span>
            <span className="text-center">IP</span>
            <span className="text-center">Date</span>
            </div>

            {activityLogs.map((log) => (
            <div key={log.id} className="text-[9px] md:text-xs font-[600] border-b grid grid-cols-4 text-black/50 dark:text-white/60 py-4 px-3">
                <div className="flex items-center">{log?.activityType[0].toUpperCase()}{log?.activityType.substring(1)}</div>
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
    </div>
  );
};

export default ActivityLog;