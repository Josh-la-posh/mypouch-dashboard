import { useEffect, useState } from "react";
import useSettingsTitle from "../../../services/hooks/useSettitngsTitle";
import { Link } from "react-router-dom";
import { ArrowRightIcon, LucideToggleLeft, LucideToggleRight } from "lucide-react";
import TextButton from "../../../components/ui/textButton";
import useTitle from "../../../services/hooks/useTitle";

const NotificationSettings = () => {
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
    setSettingsTitle('Notification');
  }, []);

  return (
    <div className="w-full space-y-5">
      <div className=" pb-5">
        <h2 className="mb-5 dark:text-white font-[600] text-md md:text-lg">Notifications</h2>
        <div className="text-black/60 dark:text-white/70 space-y-3">
          <div className="flex justify-between px-4 py-2 text-sm border-b border-gray-300">
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
          <div className="flex justify-between px-4 py-2 text-sm border-b border-gray-300">
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
          <div className="flex justify-between px-4 py-2 text-sm border-b border-gray-300">
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
          <div className="flex justify-between px-4 py-2 text-sm border-b border-gray-300">
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
    </div>
  );
};

export default NotificationSettings;