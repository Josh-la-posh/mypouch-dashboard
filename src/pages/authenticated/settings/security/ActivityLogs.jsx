import { useEffect, useState } from "react";
import TextButton from "../../../../components/ui/textButton";
import useTitle from "../../../../services/hooks/useTitle";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import SettingsService from "../../../../services/api/settingsApi";
import Spinner from "../../../../components/ui/spinner";
import ErrorLayout from "../../../../components/ui/error_page";
import { dateFormatter, timeFormatter } from "../../../../utils/dateFormatter";
import CustomModal from "../../../../components/ui/custom-modal";


const ActivityLog = () => {
    const {setAppTitle} = useTitle();
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const {activityLogsLoading, activityLogsError, activityLogs} = useSelector((state) => state.setting);
    const settingService = new SettingsService(axiosPrivate);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState({});

    const openModal = (val) => {
        setSelectedAdmin(val);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

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
            <span>Activity</span>
            <span className="text-center">Action Details</span>
            <span className="text-center">IP</span>
            <span className="text-center">Date</span>
            </div>

            {activityLogs.map((log) => (
            <div key={log.id} className="text-[9px] md:text-xs font-[600] border-b grid grid-cols-4 text-black/50 dark:text-white/60 py-4 px-3">
                <div className="flex items-center">{log?.activityType[0].toUpperCase()}{log?.activityType.substring(1)}</div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <span className="text-center">
                        {log?.description}                    
                    </span>                    
                    <TextButton
                        className='border py-1 px-2 rounded-sm text-[8px]'
                        onClick={() => openModal(log)}
                    >
                        Check Details
                    </TextButton>
                </div>
                <div className="flex items-center justify-center">{log?.ipAddress}</div>
                <div className="flex flex-col justify-center items-center gap-3">
                    <span>
                        {dateFormatter(log.createdDate)}
                    </span>
                    <span>
                        {timeFormatter(log.createdDate)}
                    </span>
                </div>
            </div>
            ))}
        </div>
        
        {/* Modal component */}
        <CustomModal isOpen={isModalOpen} title="Activity Details" onClose={closeModal}>
            <div className="space-y-6">
                <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>Email</p>
                    <p>{selectedAdmin?.admin?.email}</p>
                </div>
                <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>Activity</p>
                    <p>{selectedAdmin.activityType}</p>
                </div>
                <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>Entity Id</p>
                    <p>{selectedAdmin.entityId}</p>
                </div>
                <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>Entity Type</p>
                    <p>{selectedAdmin.entityType}</p>
                </div>
                <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>IP Address</p>
                    <p>{selectedAdmin.ipAddress}</p>
                </div>
                {selectedAdmin?.admin?.role?.name !== null &&
                    <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                        <p>Role</p>
                        <p>{selectedAdmin?.admin?.role?.name}</p>
                    </div>
                }
                <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>Created Date</p>
                    <p>{dateFormatter(selectedAdmin?.createdDate)}</p>
                </div>
                <div className="text-center text-sm border border-gray-300 py-2 px-4 rounded-sm">
                    <p>Description</p>
                    <p>{selectedAdmin.description}</p>
                </div>
            </div>
        </CustomModal>
    </div>
  );
};

export default ActivityLog;