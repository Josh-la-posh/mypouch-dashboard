import { useEffect, useState } from "react";
import { UserTable } from "../../../components/user-table";
import StatusBadge from "../../../components/ui/status-badge";
import { Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import TransactionService from "../../../services/api/transactionApi";
import { dateFormatter } from "../../../utils/dateFormatter";
import CustomModal from "../../../components/ui/custom-modal";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import SelectField from "../../../components/ui/select";
import Button from "../../../components/ui/button";
import useTitle from "../../../services/hooks/useTitle";
import { TRANSACTIONSTATUS } from "../../../data/transaction-status";
import Card from "../../../components/ui/card";
import InputField from "../../../components/ui/input";
import { TRANSACTIONTYPE } from "../../../data/transaction-type";

const Transactions = () => {
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

    const {setAppTitle} = useTitle();
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const {loading, error, transactions, currentPage, totalPages, wallets} = useSelector((state) => state.transaction);
    const transactionService = new TransactionService();
    const [filteredData, setFilteredData] = useState(transactions);
    const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
    const [userTotalPages, setUserTotalPages] = useState(totalPages);
    const [userPageSize, setUserPageSize] = useState('10');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [date, setDate] = useState('');
    const cardColor = 'bg-[#F1F8FF]';
  
    useEffect(() => {
        setAppTitle('Transactions');
    }, []);

    const openModal = (val) => {
        setSelectedTransaction(val);
        console.log('Selected trans: ', val);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const loadTransaction = async (date, transactionType, search, status, page, limit) => {
        const newStatus = status === 'All' ? '' : status;
        const newType = transactionType === 'All' ? '' : transactionType;
        await transactionService.fetchtransactions(date, newType, search, newStatus, page, limit, dispatch);
    }

    const loadWallets = async () => {
      await transactionService.fetchWallets(dispatch);
    }
  
    useEffect(() => {
      loadWallets('');
    }, [dispatch]);

    useEffect(() => {
        setFilteredData(transactions);
    }, [transactions]);

    useEffect(() => {
        setUserCurrentPage(currentPage);
    }, [currentPage]);

    useEffect(() => {
        setUserTotalPages(totalPages);
    }, [totalPages]);

    useEffect(() => {
        loadTransaction(date, transactionType, search, status, userCurrentPage, userPageSize);
    }, [dispatch, date, userCurrentPage, userPageSize]);

    const handleFilterChange = (e) => {
        const { value } = e.target;
        setStatus(value);
    }

    const handleTransactionChange = (e) => {
        const { value } = e.target;
        setTransactionType(value);
    }

    const onRefresh = () => {
        loadTransaction(date, transactionType, search, status, userCurrentPage, userPageSize);
    };

    if (loading) return <Spinner />

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />
  
    return (
    <div className="space-y-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-x-scroll scrollbar-none">
            {
                wallets && wallets.map((wallet) => (
                    <div key={wallet.currency} className="w-full flex-1">
                        <Card
                            icon={wallet?.currency}
                            iconClassName='w-4 md:w-8 h-4 md:h-8 text-[5px] md:text-[9px] font-[700] rounded-full flex items-center justify-center bg-[#D0CDE1]/30'
                            className='w-full'
                            amount={wallet?.totalBalance}
                            name='Total balance'
                            rate=''
                            color={cardColor}
                        />
                    </div>
                ))
            }
        </div>
        <div className="space-y-6">
            <div className="flex items-center gap-4 my-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="flex items-center gap-4">
                        <SelectField
                            options={TRANSACTIONSTATUS}
                            placeholder="Filter"
                            value={status}
                            onChange={handleFilterChange}
                        />
                        <SelectField
                            options={TRANSACTIONTYPE}
                            placeholder="Type"
                            value={transactionType}
                            onChange={handleTransactionChange}
                        />
                    </div>
                    <InputField
                        placeholder='Transaction Id'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="p-0 m-0">
                    <Button
                        onClick={() => loadTransaction('', transactionType, search, status, '1', '10')}
                        className='text-xs'
                    >
                        Search
                    </Button>
                </div>
            </div>
            <UserTable
                data={filteredData}
                columns={columns}
                totalPages={userTotalPages}
                currentPage={userCurrentPage}
                setCurrentPage={setUserCurrentPage}
                rowsPerPage={userPageSize}
                setRowsPerPage={setUserPageSize}
            />
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
                        <div 
                            className={`w-2 h-2 rounded-full ${selectedTransaction.status === 'Successful' ? 'bg-green-600' : selectedTransaction.status === 'Pending' ? 'bg-yellow-600' : 'bg-black'}`}
                        ></div>
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

export default Transactions;