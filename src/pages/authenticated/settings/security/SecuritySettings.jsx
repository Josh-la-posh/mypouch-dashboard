import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";


const SecuritySettings = () => {

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
          <Link
            to='/settings/security/audit-logs'
            className='flex justify-between items-center text-sm font-[600] text-black/60 dark:text-white/70 px-4 py-2 border-b border-gray-300 hover:bg-primary hover:text-white'
          >
            Audit Logs
            <ArrowRightIcon size='17px' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;