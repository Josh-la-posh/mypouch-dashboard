import React, { useEffect, useState } from "react";
import { Tabs, TabContent, TabsList, TabTrigger, CustomTab } from "../../components/ui/tabs";
import { Eye, Users } from "lucide-react";
import InputField from "../../components/ui/input";
import { UserTable } from "../../components/user-table";
import StatusBadge from "../../components/ui/status-badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../services/hooks/useAxiosPrivate";
import UserService from "../../services/api/userApi";
import ErrorLayout from "../../components/ui/error_page";
import Spinner from "../../components/ui/spinner";
import { dateFormatter } from "../../utils/dateFormatter";

const User = () => {

  const columns = [
    {
        header: 'ID',
        accessor: 'id',
    },
    {
        header: 'Name',
        accessor: 'firstName',
        render: (firstName) => (
          <div>{firstName.charAt(0).toUpperCase() + firstName.slice(1)}</div>
        ),
    },
    {
        header: 'Email',
        accessor: 'email',
    },
    {
        header: 'Mobile',
        accessor: 'phoneNumber',
    },
    {
        header: 'Date',
        accessor: 'createdDate',
        render: (value) => (
          <span>
            {dateFormatter(value)}
          </span>
        ),
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
            >
                <Eye size='22px' className="text-primary" />
            </Link>
        ),
    },
  ];

  const TABS = [
    { value: "total", label: "Total Users" },
    { value: "active", label: "Active Users" },
    { value: "inactive", label: "Inactive Users" },
    { value: "blocked", label: "Blocked Users" },
    { value: "deleted", label: "Deleted Users" },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, users} = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState()
  const userService = new UserService(axiosPrivate);
  const [filteredData, setFilteredData] = useState(users);
  const [search, setSearch] = useState('');

  const loadUsers = async () => {
    await userService.fetchUsers(dispatch);
  }

  useEffect(() => {
    console.log('The current user is: ', users);
    setFilteredData(users);
  }, [users]);
  
  useEffect(() => {
    loadUsers();
  }, [dispatch]);

  const onRefresh = () => {
    loadUsers();
  };

  if (loading) return <Spinner />

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

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
            <InputField
              placeholder='Search ID/Name/Mobile'
              id='search'
              value={search}
              onChange={(e) => setSearch(e.trget.value)}
            />
          </div>
          <div className="text-sm text-gray-500">23,000 Records Found</div>
          <UserTable
            data={filteredData}
            columns={columns}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </div>
      </CustomTab>
  </div>
  );
};

export default User;