import { useEffect, useState } from "react";
import { CustomTab } from "./ui/tabs";
import UserProfile from "../pages/authenticated/users/UserProfile";
import UserAccount from "../pages/authenticated/users/UserAccount";
import UserTransactionHistory from "../pages/authenticated/users/UserTransctionHistory";
import UserIdVerification from "../pages/authenticated/users/UserIdVerification";
import UserActivityLog from "../pages/authenticated/users/UserActivityLog";
import { useParams } from "react-router-dom";
import useTitle from "../services/hooks/useTitle";

const UserDetails = () => {

  const TABS = [
    { value: "profile", label: "Profile" },
    { value: "account", label: "Account" },
    { value: "latestTransaction", label: "Latest Transaction" },
    { value: "idVerification", label: "ID Verification" },
    { value: "activityLog", label: "Activity Log" },
  ];

  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const {id} = useParams();
  const {setAppTitle} = useTitle();
  
    useEffect(() => {
      setAppTitle('Users');
    }, []);

  return (
    <div className="space-y-6">
      <CustomTab
        TABS={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabClassName='px-3 py-2 flex justify-around border'
        activeClassName='bg-primary-light/65 border-none font-bold'
        inactiveClassName='text-primary font-bold'
      >
        {
          activeTab === 'profile' 
          ? <UserProfile id={id} />
          : activeTab === 'account' 
          ? <UserAccount id={id} />
          : activeTab === 'latestTransaction' 
          ? <UserTransactionHistory id={id} />
          : activeTab === 'idVerification' 
          ? <UserIdVerification id={id} />
          : <UserActivityLog id={id} />
        }
      </CustomTab>
  </div>
  );
};

export default UserDetails;