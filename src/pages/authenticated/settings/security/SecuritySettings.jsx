import { ArrowDown, ArrowRightIcon, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useTitle from "../../../../services/hooks/useTitle";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";


const SecuritySettings = () => {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const [isLogDisplayed, setIsLogDisplayed] = useState(false);
  
    
  useEffect(() => {
    setAppTitle('Settings');
}, []);
  
useEffect(() => {
  setSettingsTitle('Security Settings');
}, []);

  return (
    <div className="min-h-[60vh]">
      <div className="dashboard-panel dark:bg-slate-900 dark:border-slate-700 p-4 md:p-6">
        <h2 className="mb-5 text-slate-800 dark:text-slate-100 font-[600] text-md md:text-lg">Security</h2>
        <div className="space-y-2">
          <Link
            to='/settings/security/change-password'
            className='flex justify-between items-center text-sm font-[600] text-slate-700 dark:text-slate-200 px-4 py-2 border-b border-slate-200 dark:border-slate-700 hover:bg-primary hover:text-white rounded-lg'
          >
            Change Password
            <ArrowRightIcon size='17px' />
          </Link>
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-700">
            <button
              className='w-full flex justify-between items-center text-sm font-[600] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 px-4 py-2 rounded-lg'
              onClick={() => setIsLogDisplayed(!isLogDisplayed)}
            >
              Audit Logs
              {isLogDisplayed && <ArrowUp size='17px' />}
              {!isLogDisplayed && <ArrowDown size='17px' />}
            </button>
            {isLogDisplayed &&
            <div>
              <Link
                to='/settings/security/login-logs'
                className='flex justify-between items-center text-sm font-[600] text-slate-700 dark:text-slate-200 px-4 py-2 hover:bg-primary hover:text-white rounded-lg'
              >
                Login Logs
                <ArrowRightIcon size='17px' />
              </Link>
              <Link
                to='/settings/security/activity-logs'
                className='flex justify-between items-center text-sm font-[600] text-slate-700 dark:text-slate-200 px-4 py-2 hover:bg-primary hover:text-white rounded-lg'
              >
                Activity Logs
                <ArrowRightIcon size='17px' />
              </Link>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
