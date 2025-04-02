import { ArrowDown, ArrowRightIcon, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";


const SecuritySettings = () => {
  const [isLogDisplayed, setIsLogDisplayed] = useState(false);
  return (
    <div className="min-h-screen">
      <div className="">
        <h2 className="mb-5 dark:text-white font-[600] text-md md:text-lg">Security</h2>
        <div className="space-y-2">
          <Link
            to='/settings/security/change-password'
            className='flex justify-between items-center text-sm font-[600] text-black/60 dark:text-white/70 px-4 py-2 border-b border-gray-300 hover:bg-primary hover:text-white'
          >
            Change Password
            <ArrowRightIcon size='17px' />
          </Link>
          <div className="space-y-2 border-b border-gray-300">
            <button
              className='w-full flex justify-between items-center text-sm font-[600] text-black/60 dark:text-white/70 hover:bg-black/10 px-4 py-2'
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
                className='flex justify-between items-center text-sm font-[600] text-black/60 dark:text-white/70 px-4 py-2 hover:bg-primary hover:text-white'
              >
                Login Logs
                <ArrowRightIcon size='17px' />
              </Link>
              <Link
                to='/settings/security/activity-logs'
                className='flex justify-between items-center text-sm font-[600] text-black/60 dark:text-white/70 px-4 py-2 hover:bg-primary hover:text-white'
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