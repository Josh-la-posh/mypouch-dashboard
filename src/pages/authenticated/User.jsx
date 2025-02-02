import React, { useState } from "react";
import { Tabs, TabContent, TabsList, TabTrigger, CustomTab } from "../../components/ui/tabs";
import { Eye, Users } from "lucide-react";
import InputField from "../../components/ui/input";
import { UserTable } from "../../components/user-table";
import StatusBadge from "../../components/ui/status-badge";
import { Link } from "react-router-dom";

const User = () => {
  const columns = [
    {
        header: 'ID',
        accessor: 'id',
    },
    {
        header: 'Name',
        accessor: 'name',
    },
    {
        header: 'Email',
        accessor: 'email',
    },
    {
        header: 'Mobile',
        accessor: 'mobile',
    },
    {
        header: 'Date',
        accessor: 'joinedDate',
    },
    {
        header: 'Status',
        accessor: 'status',
        render: (status) => (
          <StatusBadge status={status} />
        ),
    },
    {
        header: '',
        accessor: '',
        render: () => (
            <Link
                to='/user/details'
                className='p-2 rounded-sm border border-gray-200'
            >
                <Eye size='22px' className="text-primary" />
            </Link>
        ),
    },
  ];

  const USERS = [
    {
      id: "12345UD",
      name: "Morgan K.",
      email: "bankolesunday@yopmail.com",
      mobile: "09056365649",
      joinedDate: "24 DEC. 2024",
      status: "Active",
    },
    {
      id: "12345UD",
      name: "Moran K.",
      email: "bankolesunday@yopmail.com",
      mobile: "09056365649",
      joinedDate: "24 DEC. 2024",
      status: "Blocked",
    },
  ]

  const TABS = [
    { value: "total", label: "Total Users" },
    { value: "active", label: "Active Users" },
    { value: "inactive", label: "Inactive Users" },
    { value: "blocked", label: "Blocked Users" },
    { value: "deleted", label: "Deleted Users" },
  ];

  const [activeTab, setActiveTab] = useState(TABS[0].value);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md w-fit">
          <Users className="h-5 w-5" />
          <span className="font-semibold">Users</span>
      </div>
      <CustomTab 
        TABS={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 md:max-w-[600px]">
              <InputField placeholder='Search ID/Name/Mobile' />
          </div>
          <div className="text-sm text-gray-500">23,000 Records Found</div>
          <UserTable
            data={USERS}
            columns={columns}
            rowsPerPageOptions={[10, 20, 50]}
          />
      </div>
      </CustomTab>
  </div>
  );
};

export default User;