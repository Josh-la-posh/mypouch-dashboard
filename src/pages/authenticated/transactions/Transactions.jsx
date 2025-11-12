import { useEffect, useState, useMemo } from "react";
import { UserTable } from "../../../components/user-table";
import StatusBadge from "../../../components/ui/status-badge";
import { Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
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
import { CustomTab } from "../../../components/ui/tabs";
import { CURRENCIES } from "../../../data/currencies";
import { TRANSACTIONTYPE } from "../../../data/transaction-type";
import { formatAmount } from "../../../utils/amountFormmerter";
import { toast } from "react-toastify";

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
    const {loading, error, transactions, currentPage, totalPages} = useSelector((state) => state.transaction);
    const transactionService = useMemo(()=> new TransactionService(), []);
    const [filteredData, setFilteredData] = useState(transactions);
    const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
    const [userTotalPages, setUserTotalPages] = useState(totalPages);
    const [userPageSize, setUserPageSize] = useState('10');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [status, setStatus] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [currency, setCurrency] = useState('All');
    const [search, setSearch] = useState('');
    const [date, setDate] = useState('');
    const [exporting, setExporting] = useState(false);
  
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

    // Sub-tabs & limit feature state (must be before early returns)
    const limitTabs = [
        { label: 'Transactions', value: 'transactions' },
        { label: 'Transaction Limit', value: 'transaction-limit' },
    ];
    const [activeSubTab, setActiveSubTab] = useState('transactions');
    const { limits, limitsLoading, limitsError, isCreatingLimit, createLimitError } = useSelector((state)=> state.transaction);
    const [limitMode, setLimitMode] = useState('setup'); // setup | list
    const [limitTransactionType, setLimitTransactionType] = useState('Credit');
    const [limitCurrency, setLimitCurrency] = useState('USD');
    const [limitDate, setLimitDate] = useState(() => new Date().toISOString().slice(0,10));
    // Global limit form: we collect both daily & monthly limits simultaneously per new endpoint contract
    const [limitPeriod, setLimitPeriod] = useState('daily'); // keeps progress bar context (daily or monthly view)
    const [dailyLimitAmount, setDailyLimitAmount] = useState('');
    const [monthlyLimitAmount, setMonthlyLimitAmount] = useState('');

    // Progress bar assumptions: Using a fixed MAX reference value to show percentage of entered amount.
    // Assumption: 2,000,000 as illustrative cap (adjust when real cap data is available from backend).
    // Progress bar references for illustrative scaling only.
    const DAILY_MAX_REFERENCE = 5000000; // matches example daily limit
    const MONTHLY_MAX_REFERENCE = 25000000; // matches example monthly limit
    const parseAmount = (val) => {
        if (!val) return 0;
        const numeric = Number(val.toString().replace(/,/g, ''));
        return isNaN(numeric) ? 0 : numeric;
    };
    const progressPercent = (() => {
        if (limitPeriod === 'daily') {
            return Math.min(100, Math.round((parseAmount(dailyLimitAmount) / DAILY_MAX_REFERENCE) * 100));
        }
        return Math.min(100, Math.round((parseAmount(monthlyLimitAmount) / MONTHLY_MAX_REFERENCE) * 100));
    })();

    // Fetch limits only once when entering the "list" view of the transaction-limit tab (prevent continuous re-fetch)
    useEffect(()=> {
        if (activeSubTab === 'transaction-limit' && limitMode === 'list' && limits.length === 0) {
            transactionService.fetchTransactionLimits(dispatch);
        }
    }, [activeSubTab, limitMode, limits.length, transactionService, dispatch]);

    if (loading) return <Spinner />

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />
  

    // Fetch limits when entering tab or switching to list

    const handleCreateLimit = async () => {
        if (!dailyLimitAmount || isNaN(Number(parseAmount(dailyLimitAmount))) || Number(parseAmount(dailyLimitAmount)) <= 0) {
            return toast.error('Enter a valid daily limit');
        }
        if (!monthlyLimitAmount || isNaN(Number(parseAmount(monthlyLimitAmount))) || Number(parseAmount(monthlyLimitAmount)) <= 0) {
            return toast.error('Enter a valid monthly limit');
        }
        await transactionService.createTransactionLimit({
            transactionType: limitTransactionType,
            currency: limitCurrency,
            dailyLimit: parseAmount(dailyLimitAmount),
            monthlyLimit: parseAmount(monthlyLimitAmount),
        }, dispatch);
        if (!createLimitError) {
            setDailyLimitAmount('');
            setMonthlyLimitAmount('');
            setLimitMode('list');
        }
    };

    return (
        <div className="space-y-16">
            <SummaryCardsTabs />
            <CustomTab
                TABS={limitTabs}
                activeTab={activeSubTab}
                setActiveTab={setActiveSubTab}
                className='w-full'
                activeClassName='font-semibold'
                inactiveClassName=''
            >
                {activeSubTab === 'transactions' && (
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
                )}
                {activeSubTab === 'transaction-limit' && (
                    <div className='space-y-8 mt-5'>
                        {/* Mode Toggle */}
                        <div className='flex gap-3'>
                            <Button variant={limitMode === 'setup' ? 'primary' : 'secondary'} className='text-xs' onClick={()=> setLimitMode('setup')}>Transaction Limit Set Up</Button>
                            <Button variant={limitMode === 'list' ? 'primary' : 'secondary'} className='text-xs' onClick={()=> setLimitMode('list')}>Transaction Limit List</Button>
                        </div>
                        {limitMode === 'setup' && (
                            <div className='space-y-6 border border-gray-300 dark:border-gray-600 rounded-sm p-4'>
                                <div className='grid sm:grid-cols-3 gap-4'>
                                    <div>
                                        <p className='text-[10px] font-semibold mb-1'>Transaction Type</p>
                                        <SelectField options={['Credit','Debit']} value={limitTransactionType} onChange={(e)=> setLimitTransactionType(e.target.value)} placeholder='Type' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-semibold mb-1'>Currency Type</p>
                                        <SelectField options={CURRENCIES.filter(c=> c !== 'All')} value={limitCurrency} onChange={(e)=> setLimitCurrency(e.target.value)} placeholder='Currency' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-semibold mb-1'>Date</p>
                                        <input type='date' value={limitDate} onChange={(e)=> setLimitDate(e.target.value)} className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full' />
                                    </div>
                                </div>
                                <div className='flex gap-4 justify-center'>
                                    <div className="w-fit">
                                        <Button variant={limitPeriod === 'daily' ? 'primary' : 'secondary'} className='text-xs' onClick={()=> setLimitPeriod('daily')}>Daily View</Button>
                                    </div>
                                    <div className="w-fit">
                                        <Button variant={limitPeriod === 'monthly' ? 'primary' : 'secondary'} className='text-xs' onClick={()=> setLimitPeriod('monthly')}>Monthly View</Button>
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className='space-y-3'>
                                    <p className='text-center text-xs font-semibold'>Transaction {limitPeriod === 'daily' ? 'Daily' : 'Monthly'} Limit</p>
                                    <div className="w-full flex justify-center">
                                        <div className='bg-gray-400 w-[200px] md:w-[350px] lg:w-[500px] flex items-center gap-3 py-3 px-5 lg:px-10 rounded-full'>
                                            <span className='text-primary text-sm font-bold'>{progressPercent}%</span>
                                            <div className='flex-1 h-6 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
                                                <div
                                                    className='h-full bg-primary transition-all duration-300'
                                                    style={{ width: `${progressPercent}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid sm:grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-[10px] font-semibold mb-1'>Daily Limit Amount</p>
                                        <input type='text' value={dailyLimitAmount} onChange={(e)=> setDailyLimitAmount(e.target.value)} placeholder='e.g. 5000000' className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-semibold mb-1'>Monthly Limit Amount</p>
                                        <input type='text' value={monthlyLimitAmount} onChange={(e)=> setMonthlyLimitAmount(e.target.value)} placeholder='e.g. 25000000' className='border text-xs px-3 py-2 rounded-sm outline-none dark:bg-transparent w-full' />
                                    </div>
                                </div>
                                {createLimitError && <p className='text-[11px] text-red-500'>{createLimitError}</p>}
                                <div className='w-[180px]'>
                                    <Button variant='primary' disabled={isCreatingLimit} onClick={handleCreateLimit} className='text-xs w-full'>
                                        {isCreatingLimit ? 'Creating...' : 'Confirm'}
                                    </Button>
                                </div>
                            </div>
                        )}
                        {limitMode === 'list' && (
                            <div className='space-y-6'>
                                {limitsLoading && <Spinner />}
                                {limitsError && <ErrorLayout errMsg={limitsError} handleRefresh={()=> transactionService.fetchTransactionLimits(dispatch)} />}
                                {!limitsLoading && !limitsError && (
                                    <UserTable
                                        data={limits.map(l => ({
                                            transactionType: l.transactionType || l.type,
                                            currency: l.currency,
                                            amount: l.amount,
                                            period: l.period,
                                            createdDate: l.createdDate || l.date,
                                            status: l.status || 'Active',
                                        }))}
                                        columns={[
                                            { header: 'Type', accessor: 'transactionType' },
                                            { header: 'Currency', accessor: 'currency' },
                                            { header: 'Amount', accessor: 'amount', render: (amt)=> <span className='font-medium'>{formatAmount(amt)}</span> },
                                            { header: 'Period', accessor: 'period' },
                                            { header: 'Date', accessor: 'createdDate', render: (d)=> <span>{dateFormatter(d)}</span> },
                                            { header: 'Status', accessor: 'status', render: (s)=> <StatusBadge status={s} /> },
                                        ]}
                                        totalPages={1}
                                        currentPage={1}
                                        setCurrentPage={()=>{}}
                                        rowsPerPage={limits.length}
                                        setRowsPerPage={()=>{}}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </CustomTab>
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