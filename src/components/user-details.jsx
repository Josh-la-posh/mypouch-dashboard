import React, { useState } from "react";
import { CustomTab } from "./ui/tabs";
import UserProfile from "../pages/authenticated/UserProfile";
import UserAccount from "../pages/authenticated/UserAccount";
import UserTransactionHistory from "../pages/authenticated/UserTransctionHistory";
import UserIdVerification from "../pages/authenticated/UserIdVerification";
import UserActivityLog from "../pages/authenticated/UserActivityLog";
import { useParams } from "react-router-dom";

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

  console.log('The selected id is: ', id);

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
          ? <UserIdVerification />
          : <UserActivityLog id={id} />
        }
      </CustomTab>
  </div>
  );
};

export default UserDetails;