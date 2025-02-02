import React, { useState } from "react";
import { CustomTab } from "./ui/tabs";
import UserProfile from "../pages/authenticated/UserProfile";
import UserAccount from "../pages/authenticated/UserAccount";

const UserDetails = () => {

  const TABS = [
    { value: "profile", label: "Profile" },
    { value: "account", label: "Account" },
    { value: "latestTransaction", label: "Latest Transaction" },
    { value: "idVerification", label: "ID Verification" },
    { value: "activityLog", label: "Activity Log" },
  ];

  const [activeTab, setActiveTab] = useState(TABS[0].value);

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
          ? <UserProfile />
          : activeTab === 'account' 
          ? <UserAccount />
          : null
        }
      </CustomTab>
  </div>
  );
};

export default UserDetails;