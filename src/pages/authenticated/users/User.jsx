import React, { useEffect, useState } from "react";
import { CustomTab } from "../../../components/ui/tabs";
import { Eye, Users } from "lucide-react";
import InputField from "../../../components/ui/input";
import { UserTable } from "../../../components/user-table";
import StatusBadge from "../../../components/ui/status-badge";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import { dateFormatter } from "../../../utils/dateFormatter";
import Button from "../../../components/ui/button";
import useTitle from "../../../services/hooks/useTitle";

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
        accessor: 'id',
        render: (id) => (
            <Link
                to={`/user/details/${id}`}
            >
                <Eye size='22px' className="text-primary" />
            </Link>
        ),
    },
  ];

  const TABS = [
    { value: "", label: "Total Users" },
    { value: "active", label: "Active Users" },
    { value: "inactive", label: "Inactive Users" },
    { value: "blocked", label: "Blocked Users" },
    { value: "deleted", label: "Deleted Users" },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const {setAppTitle} = useTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, users, currentPage, totalPages, totalRecords} = useSelector((state) => state.user);
  const userService = new UserService(axiosPrivate);
  const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
  const [userTotalPages, setUserTotalPages] = useState(totalPages);
  const [userPageSize, setUserPageSize] = useState('10');
  const [filteredData, setFilteredData] = useState(users);
  const [search, setSearch] = useState('');

  const loadUsers = async (search, status, page, limit) => {
    await userService.fetchUsers(search, status, page, limit, dispatch);
  }

  useEffect(() => {
    setAppTitle('Users');
  }, []);

  useEffect(() => {
    setFilteredData(users);
  }, [users]);

  useEffect(() => {
    setUserCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setUserTotalPages(totalPages);
  }, [totalPages]);
  
  useEffect(() => {
      loadUsers(search, activeTab, userCurrentPage, userPageSize);
  }, [dispatch, userCurrentPage, userPageSize, activeTab]);

  const onRefresh = () => {
    loadUsers();
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const handleNewSearch = () => {
    loadUsers(search, activeTab, '1', '10');
  }

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
          <div className="flex items-center gap-4 md:max-w-[600px] my-4">
            <InputField
              placeholder='Search ID/Name/Mobile'
              id='search'
              value={search}
              onChange={handleSearch}
            />
            <div className="p-0 m-0">
              <Button
                onClick={handleNewSearch}
                className='text-xs'
              >
                Search
              </Button>
            </div>
          </div>
          <div className="text-sm text-gray-500">{loading ? '0' : totalRecords} Records Found</div>
          {
            loading 
            ? <Spinner /> 
            : <UserTable
                data={filteredData}
                columns={columns}
                totalPages={userTotalPages}
                currentPage={userCurrentPage}
                setCurrentPage={setUserCurrentPage}
                rowsPerPage={userPageSize}
                setRowsPerPage={setUserPageSize}
              />            
          }
        </div>
      </CustomTab>
  </div>
  );
};

export default User;