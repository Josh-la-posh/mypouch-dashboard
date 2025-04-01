import { useEffect, useState } from "react";
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
import CustomModal from "../../../components/ui/custom-modal.jsx";
import { TRANSACTIONSTATUS } from "../../../data/transaction-status.jsx";

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
        accessor: 'row',
        render: (id, row) => (
          <button
            onClick={() => openModal(row)}
            className="text-primary dark:text-white"
          >
            <Printer size='14px' />
        </button>
        )
    },
  ];

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, userTransactions, currentPage, totalPages} = useSelector((state) => state.user);
  const userService = new UserService(axiosPrivate);
  const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
  const [userTotalPages, setUserTotalPages] = useState(totalPages);
  const [userPageSize, setUserPageSize] = useState('10');
  const [filteredData, setFilteredData] = useState(userTransactions);
  const [status, setStatus] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const openModal = (val) => {
    setSelectedTransaction(val);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const loadUserTransaction = async (id, search, status, page, limit) => {
    const finalStatus = status === 'All' ? '' : status;
    await userService.fetchUserTraansactions(id, search, finalStatus, page, limit, dispatch);
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
    loadUserTransaction(id, '', status, userCurrentPage, userPageSize);
  }, [dispatch, id, status, userCurrentPage, userPageSize]);

  const onRefresh = () => {
    loadUserTransaction(id, '', status, userCurrentPage, userPageSize);
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setStatus(value);
  }

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="">
      <div className="space-y-6">
        <p className="text-primary dark:text-[#C2A6DD] text-lg font-[600]">
            Transaction History
        </p>
        <div className="flex items-center gap-4 md:max-w-[600px] my-4">
          <SelectField
            options={TRANSACTIONSTATUS}
            placeholder=""
            value={status}
            onChange={handleFilterChange}
          />
          <div className="p-0 m-0">
            <Button
              onClick={() => loadUserTransaction(id, '', status, '1', '10')}
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
        {/* Modal component */}
      <CustomModal isOpen={isModalOpen} title="Transaction Details" onClose={closeModal}>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm">Amount</p>
            <p className="text-lg font-semibold">{selectedTransaction.transactionType === 'Debit' ? selectedTransaction.debitedCurrency : selectedTransaction.creditedCurrency} {selectedTransaction.amount}</p>
          </div>
          <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
            <p>Transaction Type</p>
            <p>{selectedTransaction.transactionType}</p>
          </div>
          <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
            <p>Transaction Status</p>
            <div className="flex items-center gap-1">
              <div className={`
                  w-2 h-2 rounded-full ${selectedTransaction.status === 'Successful' ? 'bg-green-600' : selectedTransaction.status === 'Pending' ? 'bg-yellow-600' : 'bg-black'}
              `}></div>
              <p>{selectedTransaction.status}</p>
            </div>
          </div>
          <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
            <p>Transaction Id</p>
            <p className="text-xs">{selectedTransaction.transactionId}</p>
          </div>
          <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
            <p>Date</p>
            <p>{dateFormatter(selectedTransaction.createdDate)}</p>
          </div>
          { selectedTransaction.buyerCreditedWallet &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Buyer Credited Wallet</p>
              <p className="text-xs">{selectedTransaction.buyerCreditedWallet}</p>
          </div>
          }
          { selectedTransaction.buyerDebitedWallet &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Buyer Debited Wallet</p>
              <p className="text-xs">{selectedTransaction.buyerDebitedWallet}</p>
          </div>
          }
          { selectedTransaction.creditedCurrency &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Credited Currency</p>
              <p>{selectedTransaction.creditedCurrency}</p>
          </div>
          }
          { selectedTransaction.creditedWallet &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Credited Wallet</p>
              <p className="text-xs">{selectedTransaction.creditedWallet}</p>
          </div>
          }
          { selectedTransaction.debitedAmount &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Debited Amount</p>
              <p>{selectedTransaction.debitedCurrency}{selectedTransaction.debitedAmount}</p>
          </div>
          }
          { selectedTransaction.debitWallet &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Debited Wallet</p>
              <p className="text-xs">{selectedTransaction.debitedWallet}</p>
          </div>
          }
          { selectedTransaction.rateDescription &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Rate</p>
              <p>{selectedTransaction.rateDescription}</p>
          </div>
          }
          { selectedTransaction.sellerCreditedWallet &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Seller Credited Wallet</p>
              <p className="text-xs">{selectedTransaction.sellerCreditedWallet}</p>
          </div>
          }
          { selectedTransaction.sellerDebitedWallet &&
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Seller Debited Wallet</p>
              <p className="text-xs">{selectedTransaction.sellerDebitedWallet}</p>
          </div>
          }
          <div className="text-center text-sm border border-gray-300 py-2 px-4 rounded-sm">
            <p>Description</p>
            <p>{selectedTransaction.description}</p>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default UserTransactionHistory;