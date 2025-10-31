import { useEffect, useState } from "react";
import { UserTable } from "../../../components/user-table";
import StatusBadge from "../../../components/ui/status-badge";
import { Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
// Removed unused useAxiosPrivate import after refactor
import TransactionService from "../../../services/api/transactionApi";
import { dateFormatter } from "../../../utils/dateFormatter";
import CustomModal from "../../../components/ui/custom-modal";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import SelectField from "../../../components/ui/select";
import Button from "../../../components/ui/button";
import useTitle from "../../../services/hooks/useTitle";
import { TRANSACTIONSTATUS } from "../../../data/transaction-status";
import SummaryCardsTabs from "../../../components/SummaryCardsTabs";
// Removed InputField in favor of unified plain inputs matching UserTransactionHistory
import { CURRENCIES } from "../../../data/currencies";
import { TRANSACTIONTYPE } from "../../../data/transaction-type";
import { formatAmount } from "../../../utils/amountFormmerter";

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
        render: (amount) => (
          <span className='font-medium'>{formatAmount(amount)}</span>
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

    const {setAppTitle} = useTitle();
    const dispatch = useDispatch();
    // const axiosPrivate = useAxiosPrivate(); // currently unused
    const {loading, error, transactions, currentPage, totalPages} = useSelector((state) => state.transaction);
    const transactionService = new TransactionService();
    const [filteredData, setFilteredData] = useState(transactions);
    const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
    const [userTotalPages, setUserTotalPages] = useState(totalPages);
    const [userPageSize, setUserPageSize] = useState('10');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [status, setStatus] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [currency, setCurrency] = useState('');
    const [search, setSearch] = useState('');
    const [date, setDate] = useState('');
    const [exporting, setExporting] = useState(false);
    // const cardColor = 'bg-[#F1F8FF]';
  
    useEffect(() => {
        setAppTitle('Transactions');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const openModal = (val) => {
        setSelectedTransaction(val);
        console.log('Selected trans: ', val);
        setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);

    const loadTransaction = async (page, limit) => {
        const finalStatus = status === 'All' ? '' : status;
        const finalType = transactionType === 'All' ? '' : transactionType;
        const finalCurrency = currency === 'All' ? '' : currency;
        await transactionService.fetchtransactions({
            date,
            transactionType: finalType,
            search,
            status: finalStatus,
            currency: finalCurrency,
            page,
            limit
        }, dispatch);
    };

    const loadWallets = async () => {
      await transactionService.fetchWallets(dispatch);
    }
  
        useEffect(() => {
            loadWallets('');
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
        loadTransaction(userCurrentPage, userPageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, userCurrentPage, userPageSize]);

    const handleStatusChange = (e) => setStatus(e.target.value);
    const handleTypeChange = (e) => setTransactionType(e.target.value);
    const handleCurrencyChange = (e) => setCurrency(e.target.value);
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleDateChange = (e) => setDate(e.target.value);

    const applyFilters = () => {
        setUserCurrentPage(1);
        loadTransaction(1, userPageSize);
    };

    const resetFilters = () => {
        setStatus('');
        setTransactionType('');
        setCurrency('');
        setSearch('');
        setDate('');
        setUserCurrentPage(1);
        loadTransaction(1, userPageSize);
    };

    const handleExport = async () => {
        setExporting(true);
        await transactionService.exportTransactionsExcel({
            date,
            transactionType: transactionType === 'All' ? '' : transactionType,
            search,
            status: status === 'All' ? '' : status,
            currency: currency === 'All' ? '' : currency,
            page: userCurrentPage,
            limit: userPageSize
        });
        setExporting(false);
    };

    const onRefresh = () => {
        loadTransaction(userCurrentPage, userPageSize);
    };

    if (loading) return <Spinner />

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />
  
    return (
    <div className="space-y-10">
        <SummaryCardsTabs />
        {/* <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-x-scroll scrollbar-none">
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
        </div> */}
        <div className="space-y-6">
            <div className="space-y-4 my-4">
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
                    <SelectField
                        options={TRANSACTIONSTATUS}
                        placeholder="Status"
                        value={status}
                        onChange={handleStatusChange}
                    />
                    <SelectField
                        options={TRANSACTIONTYPE}
                        placeholder="Type"
                        value={transactionType}
                        onChange={handleTypeChange}
                    />
                    <SelectField
                        options={CURRENCIES}
                        placeholder="Currency"
                        value={currency}
                        onChange={handleCurrencyChange}
                    />
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent"
                    />
                    <input
                        type="text"
                        placeholder="Search transaction id or description"
                        value={search}
                        onChange={handleSearchChange}
                        className="border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent col-span-2"
                    />
                    <div className="col-span-2 flex gap-1">
                        <Button onClick={applyFilters} className='text-xs'>Apply</Button>
                        <Button variant='secondary' className='text-xs' onClick={resetFilters}>Reset</Button>
                        <Button variant='primary' disabled={exporting} onClick={handleExport} className='text-xs'>
                            {exporting ? 'Exporting...' : 'Export'}
                        </Button>
                    </div>
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
                    <p className="text-lg font-semibold">{selectedTransaction.transactionType === 'Debit' ? selectedTransaction.debitedCurrency : selectedTransaction.creditedCurrency} {formatAmount(selectedTransaction.amount)}</p>
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
                        <p>{selectedTransaction.debitedCurrency} {formatAmount(selectedTransaction.debitedAmount)}</p>
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