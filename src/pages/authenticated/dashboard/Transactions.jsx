import { useEffect, useState } from "react";
import { UserTable } from "../../../components/user-table";
import StatusBadge from "../../../components/ui/status-badge";
import { ArrowRight, Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import DashboardService from "../../../services/api/dashboardApi";
import { dateFormatter } from "../../../utils/dateFormatter";
import CustomModal from "../../../components/ui/custom-modal";
import { Link } from "react-router-dom";
import { formatAmount } from "../../../utils/amountFormmerter";

const DashboardTransactions = () => {
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
      render: (amount, row) => (
        <span>{row.transactionType === 'Debit' ? row.debitedCurrency : row.creditedCurrency} {formatAmount(row.amount)}</span>
      )
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
  const {isTransactionLoading, transactions} = useSelector((state) => state.dashboard);
  const dashboardService = new DashboardService(axiosPrivate);
  const [filteredData, setFilteredData] = useState(transactions);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const openModal = (val) => {
    setSelectedTransaction(val);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  const loadTransaction = async () => {
    await dashboardService.fetchtransactions(dispatch);
  }

  useEffect(() => {
    setFilteredData(transactions);
  }, [transactions]);
  
  useEffect(() => {
    loadTransaction();
  }, [dispatch]);

  return (
    <div className="">
      {isTransactionLoading 
        ? <p>Fetching ...</p> 
        : <UserTable
            data={filteredData}
            columns={columns}
            drpp=''
        />}
        <div className="mt-5 flex justify-end">
          <Link
            to='/transactions'
            className="px-3 py-2 text-xs text-primary flex items-center gap-2"
          >
            View more <ArrowRight size='16px'/>
          </Link>
        </div>
        {/* Modal component */}
      <CustomModal isOpen={isModalOpen} title="Transaction Details" onClose={closeModal}>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm">Amount</p>
            <p className="text-lg font-semibold">{selectedTransaction.transactionType === 'Debit' ? selectedTransaction.debitedCurrency : selectedTransaction.creditedCurrency} {formatAmount(selectedTransaction.amount)}</p>
          </div>
          {selectedTransaction?.user && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                <p>Username</p>
                <p>{selectedTransaction?.user?.userName}</p>
              </div>
              <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
                <p>Email</p>
                <p>{selectedTransaction?.user?.email}</p>
              </div>
            </div>
          )}
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
              <p>{selectedTransaction.debitedCurrency}{formatAmount(selectedTransaction.debitedAmount)}</p>
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

export default DashboardTransactions;