import React, { useEffect, useState } from "react";
import { UserTable } from "../../../components/user-table";
import StatusBadge from "../../../components/ui/status-badge";
import { Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import Button from "../../../components/ui/button";
import SelectField from "../../../components/ui/select";
import { dateFormatter } from "../../../utils/dateFormatter";

const UserTransactionHistory = ({id}) => {
  const columns = [
    {
        header: 'Status',
        accessor: 'status',
        render: (status) => (
          <div 
            className="flex items-center gap-1">
            <div className={`
                w-2 h-2 rounded-full ${status === 'Successful' ? 'bg-green-600' : status === 'Pending' ? 'bg-yellow-600' : 'bg-black'}
            `}></div>
            {status}
          </div>
        ),
    },
    {
        header: 'Date',
        accessor: 'createdDate',
        render: (createdDate) => (
          <span>{dateFormatter(createdDate)}</span>
        ),
    },
    {
        header: 'Transaction Type',
        accessor: 'transactionType',
        render: (transactionType) => (
          <StatusBadge status={transactionType} />
        ),
    },
    {
        header: 'Amount',
        accessor: 'amount',
    },
    {
        header: '',
        accessor: '',
        render: (category) => (
          <Printer size='14px' />
        )
    },
  ];

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, userTransactions, currentPage, totalPages, pageSize, totalRecords} = useSelector((state) => state.user);
  const userService = new UserService(axiosPrivate);
  const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
  const [userTotalPages, setUserTotalPages] = useState(totalPages);
  const [userPageSize, setUserPageSize] = useState(pageSize);
  const [filteredData, setFilteredData] = useState(userTransactions);
  const [status, setStatus] = useState('');

  const loadUserTransaction = async (id, search, status, page, limit) => {
    await userService.fetchUserTraansactions(id, search, status, page, limit, dispatch);
  }

  useEffect(() => {
    setFilteredData(userTransactions);
  }, [userTransactions]);

  useEffect(() => {
    setUserCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setUserTotalPages(totalPages);
  }, [totalPages]);

  useEffect(() => {
    setUserPageSize(pageSize);
  }, [pageSize]);
  
  useEffect(() => {
    loadUserTransaction(id, '', status, userCurrentPage, userPageSize);
  }, [dispatch, id, status, userCurrentPage, userPageSize]);

  const onRefresh = () => {
    loadUserTransaction();
  };

  const handleFilterChange = (e) => {
      const { value } = e.target;
      setStatus(value);
  }

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="space-y-6">
        <p className="text-primary text-lg font-[600]">
            Transaction History
        </p>
        <div className="flex items-center gap-4 md:max-w-[600px] my-4">
          <SelectField
            options={['Successful', 'Failed', 'Reversed', 'Pending']}
            placeholder="Filter"
            value={status}
            onChange={handleFilterChange}
          />
          <div className="p-0 m-0">
            <Button
              onClick={() => loadUserTransaction(id, '', status, userCurrentPage, userPageSize)}
              className='text-xs'
            >
              Search
            </Button>
          </div>
        </div>
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
  );
};

export default UserTransactionHistory;