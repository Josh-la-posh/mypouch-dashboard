import { useEffect, useState } from "react";
import useSettingsTitle from "../../../services/hooks/useSettitngsTitle";
import { Link } from "react-router-dom";
import { ArrowRightIcon, LucideToggleLeft, LucideToggleRight } from "lucide-react";
import TextButton from "../../../components/ui/textButton";
import useTitle from "../../../services/hooks/useTitle";

const SecurityAndPermission = () => {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const [formData, setFormData] = useState({
      emailNot: false,
      rateAlert: ''
  });
    
  useEffect(() => {
      setAppTitle('Settings');
  }, []);
      
  useEffect(() => {
    setSettingsTitle('Security & Permission');
  }, []);

  return (
    <div className="w-fullmax-w-[400px] space-y-5">
      <div className="border-b-2 border-b-app-bg dark:border-b-[#20263D] pb-5">
        <h2 className="mb-5 dark:text-white font-[600] text-md md:text-lg">Permissions</h2>
        <div className="text-primary dark:text-white space-y-3">
          <div className="flex justify-between px-4 py-2 text-sm border border-primary dark:border-white rounded-sm">
            <p className="font-[600]">Currency Rate Alerts</p>
            <div className="flex items-center gap-3">
                <TextButton
                    onClick={() => setFormData((prev) => ({
                        ...prev,
                        emailNot: !formData.emailNot
                    }))}
                >
                    {
                        formData.emailNot === true
                            ? <LucideToggleRight className="size='22px'" />
                            : <LucideToggleLeft className="text-black size='22px'" />
                    }
                </TextButton>
                <p className="">off</p>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2 text-sm border border-primary dark:border-white rounded-sm">
            <p className="font-[600]">Admin Management Notifications</p>
            <div className="flex items-center gap-3">
                <TextButton
                    onClick={() => setFormData((prev) => ({
                        ...prev,
                        emailNot: !formData.emailNot
                    }))}
                >
                    {
                        formData.emailNot === true
                            ? <LucideToggleRight className="size='22px'" />
                            : <LucideToggleLeft className="text-black size='22px'" />
                    }
                </TextButton>
                <p className="">off</p>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2 text-sm border border-primary dark:border-white rounded-sm">
            <p className="font-[600]">Customer Support & Service</p>
            <div className="flex items-center gap-3">
                <TextButton
                    onClick={() => setFormData((prev) => ({
                        ...prev,
                        emailNot: !formData.emailNot
                    }))}
                >
                    {
                        formData.emailNot === true
                            ? <LucideToggleRight className="size='22px'" />
                            : <LucideToggleLeft className="text-black size='22px'" />
                    }
                </TextButton>
                <p className="">off</p>
            </div>
          </div>
          <div className="flex justify-between px-4 py-2 text-sm border border-primary dark:border-white rounded-sm">
            <p className="font-[600]">Fraud & Security Monitoring</p>
            <div className="flex items-center gap-3">
                <TextButton
                    onClick={() => setFormData((prev) => ({
                        ...prev,
                        emailNot: !formData.emailNot
                    }))}
                >
                    {
                        formData.emailNot === true
                            ? <LucideToggleRight className="size='22px'" />
                            : <LucideToggleLeft className="text-black size='22px'" />
                    }
                </TextButton>
                <p className="">off</p>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="mb-5 dark:text-white font-[600] text-md md:text-lg">Security</h2>
        <div className="">
          <Link
            to='/settings/security-and-permission/change-password'
            className='max-w-[450px] border border-primary dark:border-white dark:border-white hover:bg-primary text-primary dark:text-white hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
          >
            Change Password
            <ArrowRightIcon size='17px' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecurityAndPermission;