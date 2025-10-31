import { useEffect, useState, useCallback, useMemo } from 'react';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
// import TextButton from '../../../../components/ui/textButton';
import Card from '../../../../components/ui/card';
import SelectField from '../../../../components/ui/select';
import InputField from '../../../../components/ui/input';
import Button from '../../../../components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CURRENCIES } from '../../../../data/currencies';
import { toast } from 'react-toastify';
import RedirectToLink from './redirect-link.jsx';
import StatusBadge from '../../../../components/ui/status-badge.jsx';
import { dateFormatter } from '../../../../utils/dateFormatter.jsx';
import Spinner from '../../../../components/ui/spinner.jsx';
import { UserTable } from '../../../../components/user-table.jsx';
import { Printer } from 'lucide-react';
import { CustomTab } from '../../../../components/ui/tabs';
import { Check } from 'lucide-react';
import CustomModal from '../../../../components/ui/custom-modal.jsx';
import { TRANSACTIONSTATUS } from '../../../../data/transaction-status.jsx';
import { TRANSACTIONTYPE } from '../../../../data/transaction-type.jsx';
import { formatAmount } from '../../../../utils/amountFormmerter.jsx';

function PouchWallet() {
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
    const { setSettingsTitle } = useSettingsTitle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
  const adminService = useMemo(() => new AdminService(axiosPrivate, navigate), [axiosPrivate, navigate]);
  const {adminCurrencies, isFundingAdminWallet, isGottenLink, fundingWalletLink, adminCurrenciesLoading, currentPage, pouchTransactionLoading, totalPages, pouchTransaction, manualFundingProviders, manualFundingProvidersLoading, manualFundingMessage, isInitiatingManualFunding} = useSelector((state) => state.admin);
  useEffect(() => {
    if (manualFundingMessage) {
      const t = setTimeout(() => {
        // Clear message after 6s
        dispatch({ type: 'admin/clearManualFundingMessage' });
      }, 6000);
      return () => clearTimeout(t);
    }
  }, [manualFundingMessage, dispatch]);
  const [activeTab, setActiveTab] = useState('pouch-wallet');
  const [searchParams, setSearchParams] = useSearchParams();
  const [fundMode, setFundMode] = useState('direct'); // direct | manual
  const [directFundingType, setDirectFundingType] = useState('naira'); // naira | foreign
  const [provider, setProvider] = useState('Paystack'); // Paystack | Flutterwave
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [fundAmount, setFundAmount] = useState('0');
    const [manualProvider, setManualProvider] = useState('');
    const [manualCurrency, setManualCurrency] = useState('USD');
    const [manualAmount, setManualAmount] = useState('');
    const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
    const [userTotalPages, setUserTotalPages] = useState(totalPages);
    const [userPageSize, setUserPageSize] = useState('10');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [status, setStatus] = useState('All');
    const [type, setType] = useState('All');
  const [date] = useState('');
  
    const openModal = (val) => {
      setSelectedTransaction(val);
      setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, [setAppTitle]);

  useEffect(() => {
    setSettingsTitle('Pouch Wallet');
  }, [setSettingsTitle]);

  const loadCurrencies = useCallback(async (cur) => {
    await adminService.fetchPouchWallets(cur, dispatch);
  }, [adminService, dispatch]);

  const loadPouchTransactions = useCallback(async (dateVal, typeVal, statusVal, page, limit) => {
    const finalStatus = statusVal === 'All' ? '' : statusVal;
    const finalType = typeVal === 'All' ? '' : typeVal === 'System Exchange' ? 'SystemExchange' : typeVal;
    await adminService.fetchPouchTransactions(dateVal, finalType, finalStatus, page, limit, dispatch);
  }, [adminService, dispatch]);

  useEffect(() => {
    loadCurrencies('');
    loadPouchTransactions('', '', '', '1', '10');
  }, [loadCurrencies, loadPouchTransactions]);

  useEffect(() => {
    loadPouchTransactions('', '', '', '1', '10');
  }, [loadPouchTransactions, userCurrentPage, userPageSize]);
  
    useEffect(() => {
      setUserCurrentPage(currentPage);
    }, [currentPage]);
  
    useEffect(() => {
      setUserTotalPages(totalPages);
    }, [totalPages]);

  // Removed toggle button handlers in favor of tabs

  const handleFundWallet = async () => {
    const amt = fundAmount.trim();
    if (!amt) return toast.error('Enter a valid amount');
    if (isNaN(Number(amt))) return toast.error('Amount must be numeric');
    if (Number(amt) <= 0) return toast.error('Amount must be greater than 0');

    // Direct Naira funding provider-specific endpoints
    if (fundMode === 'direct' && directFundingType === 'naira') {
      if (provider === 'Flutterwave') {
        await adminService.fundNairaFlutterwave(amt, dispatch);
        return;
      }
      if (provider === 'Paystack') {
        await adminService.fundNairaPaystack(amt, dispatch);
        return;
      }
      return toast.error('Select a valid Naira provider');
    }

    // Fallback to generic endpoint (e.g., foreign funding placeholder)
    await adminService.fundAdminWallet({ amount: amt, currency: selectedCurrency }, dispatch);
  }

  const handleAddWallet = async () => {
    await adminService.createAdminWallet(dispatch);
    setModalOpen(false);
  }

  const handleManualFunding = async () => {
    if (!manualProvider) return toast.error('Select a provider');
    if (!manualCurrency) return toast.error('Select currency');
    if (!manualAmount || isNaN(Number(manualAmount)) || Number(manualAmount) <= 0) return toast.error('Enter valid amount');
    await adminService.initiateManualFunding({ amount: manualAmount, currency: manualCurrency, provider: manualProvider }, dispatch);
  };

  // Fetch providers when switching to manual mode first time
  useEffect(() => {
    if (fundMode === 'manual' && manualFundingProviders.length === 0 && !manualFundingProvidersLoading) {
      adminService.fetchManualFundingProviders(dispatch);
    }
  }, [fundMode, manualFundingProviders.length, manualFundingProvidersLoading, adminService, dispatch]);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setStatus(value);
  }

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setType(value);
  }

  const cardColor = 'bg-[#F1F8FF]';

  const TABS = [
    { label: 'Pouch Wallet', value: 'pouch-wallet' },
    { label: 'Add Wallet', value: 'add-wallet' },
    { label: 'Fund Wallet', value: 'fund-wallet' },
    { label: 'Provider', value: 'provider' },
  ];

  // Initialize tab from query param on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && TABS.some(t => t.value === tabParam)) {
      setActiveTab(tabParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure query param stays in sync whenever activeTab changes
  useEffect(() => {
    const current = searchParams.get('tab');
    if (activeTab && current !== activeTab) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tab', activeTab);
      setSearchParams(newParams, { replace: true });
    }
  }, [activeTab, searchParams, setSearchParams]);

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <div className='w-full'>
      <CustomTab
        TABS={TABS}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        className='w-full'
        tabClassName='overflow-x-auto'
        activeClassName='bg-primary/10 font-semibold'
        inactiveClassName=''
      >
        {/* Pouch Wallet Tab Content */}
        {activeTab === 'pouch-wallet' && (
          <div className='space-y-10 w-full'>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-x-scroll scrollbar-none">
              {adminCurrencies && adminCurrencies.map((cur) => (
                <div key={cur.id} className="w-full flex-1">
                  <Card
                    icon={cur?.currency}
                    iconClassName='w-5 md:w-8 h-5 md:h-8 text-[7px] md:text-[9px] font-[700] rounded-full flex items-center justify-center bg-[#D0CDE1]/30'
                    className='w-full'
                    amount={formatAmount(cur?.balance)}
                    name='Total balance'
                    rate=''
                    color={cardColor}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3 md:max-w-[600px] my-4">
                <SelectField
                  options={TRANSACTIONSTATUS}
                  placeholder="Status"
                  value={status}
                  onChange={handleStatusChange}
                />
                <div className="p-0 m-0">
                  <Button
                    onClick={() => loadPouchTransactions(date, type, status, '1', '10')}
                    className='text-xs'
                  >
                    Search
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-3 md:max-w-[600px] my-4">
                <SelectField
                  options={TRANSACTIONTYPE}
                  placeholder="Type"
                  value={type}
                  onChange={handleTypeChange}
                />
                <div className="p-0 m-0">
                  <Button
                    onClick={() => loadPouchTransactions(date, type, status, '1', '10')}
                    className='text-xs'
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            {pouchTransactionLoading ? (
              <Spinner />
            ) : (
              <UserTable
                data={pouchTransaction}
                columns={columns}
                totalPages={userTotalPages}
                currentPage={userCurrentPage}
                setCurrentPage={setUserCurrentPage}
                rowsPerPage={userPageSize}
                setRowsPerPage={setUserPageSize}
              />
            )}
          </div>
        )}

        {/* Add Wallet Tab */}
        {activeTab === 'add-wallet' && (
          <div className="w-full flex justify-center pt-10 border-t border-app-bg dark:border-[#20263D]">
            <div className="max-w-[350px] space-y-5">
              <p className='text-primary dark:text-white text-sm sm:text-lg text-center'>Add all available currencies with just a click on the button below</p>
              <div className="flex justify-center">
                <div className="w-[150px]">
                  <Button
                    onClick={handleAddWallet}
                    disabled={adminCurrenciesLoading}
                    variant='primary'
                  >
                    {adminCurrenciesLoading ? 'Loading ...' : 'Continue'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fund Wallet Tab */}
        {activeTab === 'fund-wallet' && (
          <div className="w-full space-y-8 pt-6 border-t border-app-bg dark:border-[#20263D]">
            {!isGottenLink ? (
              <div className='space-y-6 max-w-[650px]'>
                {/* Funding mode dropdown */}
                <div className='space-y-2'>
                  <SelectField
                    label='Funding Mode'
                    options={['direct', 'manual']}
                    value={fundMode}
                    onChange={(e) => setFundMode(e.target.value)}
                    placeholder='Select mode'
                  />
                </div>

                {fundMode === 'direct' && (
                  <div className='space-y-6'>
                    {/* Direct funding type list */}
                    <div className='space-y-2'>
                      <p className='text-xs font-semibold text-primary dark:text-white'>Direct Funding</p>
                      <div className='space-y-3 bg-primary/10 p-4 rounded-sm border border-primary/20'>
                        {['naira', 'foreign'].map((ftype) => (
                          <button
                            key={ftype}
                            type='button'
                            onClick={() => setDirectFundingType(ftype)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-left text-sm font-semibold shadow-sm border transition-colors ${directFundingType === ftype ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-[#20263D] text-black dark:text-white border-gray-300 hover:border-primary'}`}
                          >
                            <span className='flex items-center gap-2'>
                              <span className='w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-primary/80 text-white'>₦</span>
                              {ftype === 'naira' ? 'Naira Funding' : 'Foreign Funding'}
                            </span>
                            {directFundingType === ftype && <Check size={16} className='text-white' />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Provider selection when Naira or Foreign chosen */}
                    <div className='space-y-2'>
                      <p className='text-xs font-semibold text-primary dark:text-white capitalize'>{directFundingType} providers</p>
                      <div className='space-y-3 bg-primary/10 p-4 rounded-sm border border-primary/20'>
                        {(directFundingType === 'naira' ? ['Paystack', 'Flutterwave'] : ['Stripe (Coming Soon)']).map((prov) => (
                          <button
                            key={prov}
                            type='button'
                            onClick={() => prov.includes('Coming') ? null : setProvider(prov)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-sm text-left text-sm font-semibold shadow-sm border transition-colors ${provider === prov ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-[#20263D] text-black dark:text-white border-gray-300 hover:border-primary'} ${prov.includes('Coming') ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            <span className='flex items-center gap-2'>
                              <span className='w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-primary/80 text-white'>◎</span>
                              {prov}
                            </span>
                            {provider === prov && !prov.includes('Coming') && <Check size={16} className='text-white' />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Funding form */}
                    <SelectField
                      label='Select Currency'
                      // Foreign funding should exclude NGN
                      options={directFundingType === 'naira' ? ['NGN'] : CURRENCIES.filter(c => c !== 'NGN')}
                      value={directFundingType === 'naira' ? 'NGN' : selectedCurrency}
                      placeholder=''
                      onChange={(e) => directFundingType === 'naira' ? null : setSelectedCurrency(e.target.value)}
                      disabled={directFundingType === 'naira'}
                      selectClassName={'bg-primary/14'}
                    />
                    <InputField
                      label='Amount'
                      id='fundAmount'
                      value={fundAmount}
                      onChange={(e) => setFundAmount(e.target.value)}
                      required
                    />
                    <Button
                      onClick={handleFundWallet}
                      disabled={isFundingAdminWallet}
                      variant='primary'
                    >
                      {isFundingAdminWallet ? 'Processing ...' : 'Continue'}
                    </Button>
                  </div>
                )}

                {fundMode === 'manual' && (
                  <div className='space-y-6 bg-primary/10 p-4 rounded-sm border border-primary/20'>
                    <p className='text-sm text-primary dark:text-white font-semibold'>Manual Funding</p>
                    <p className='text-[11px] text-black/70 dark:text-white/70'>Initiate a manual funding request. Operations team will verify and credit after proof review.</p>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <SelectField
                        label='Provider'
                        options={manualFundingProvidersLoading ? ['Loading...'] : manualFundingProviders.length ? manualFundingProviders : ['No providers']}
                        value={manualProvider}
                        onChange={(e) => setManualProvider(e.target.value)}
                        placeholder='Select provider'
                      />
                      <SelectField
                        label='Currency'
                        options={CURRENCIES}
                        value={manualCurrency}
                        onChange={(e) => setManualCurrency(e.target.value)}
                        placeholder='Select currency'
                      />
                    </div>
                    <InputField
                      label='Amount'
                      id='manualAmount'
                      value={manualAmount}
                      onChange={(e) => setManualAmount(e.target.value)}
                      required
                    />
                    <Button
                      onClick={handleManualFunding}
                      disabled={isInitiatingManualFunding || manualFundingProvidersLoading}
                      variant='primary'
                    >
                      {isInitiatingManualFunding ? 'Initiating...' : 'Initiate Manual Funding'}
                    </Button>
                    {manualFundingProvidersLoading && <p className='text-xs text-black/50 dark:text-white/50'>Fetching providers...</p>}
                    {manualFundingProviders.length === 0 && !manualFundingProvidersLoading && <p className='text-xs text-red-500'>No providers available.</p>}
                    {manualFundingMessage && <p className='text-xs text-green-600 dark:text-green-300 font-semibold'>{manualFundingMessage}</p>}
                  </div>
                )}
              </div>
            ) : (
              <RedirectToLink externalLink={fundingWalletLink} />
            )}
          </div>
        )}

        {/* Provider Tab */}
        {activeTab === 'provider' && (
          <div className='pt-6 border-t border-app-bg dark:border-[#20263D] space-y-4'>
            <p className='text-sm text-primary dark:text-white font-semibold'>Funding Providers</p>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
              {['Paystack', 'Flutterwave', 'Stripe (Coming Soon)'].map((prov) => (
                <div key={prov} className='p-4 border border-gray-300 dark:border-gray-600 rounded-sm flex items-center justify-between'>
                  <span className='text-xs md:text-sm'>{prov}</span>
                  <span className='text-[10px] px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300'>{prov.includes('Coming') ? 'Pending' : 'Active'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CustomTab>

      {/* Transaction Modal */}
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
              <div className={`w-2 h-2 rounded-full ${selectedTransaction.status === 'Successful' ? 'bg-green-600' : selectedTransaction.status === 'Pending' ? 'bg-yellow-600' : 'bg-black'}`}></div>
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
          {selectedTransaction.buyerCreditedWallet && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Buyer Credited Wallet</p>
              <p className="text-xs">{selectedTransaction.buyerCreditedWallet}</p>
            </div>
          )}
          {selectedTransaction.buyerDebitedWallet && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Buyer Debited Wallet</p>
              <p className="text-xs">{selectedTransaction.buyerDebitedWallet}</p>
            </div>
          )}
          {selectedTransaction.creditedCurrency && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Credited Currency</p>
              <p>{selectedTransaction.creditedCurrency}</p>
            </div>
          )}
          {selectedTransaction.creditedWallet && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Credited Wallet</p>
              <p className="text-xs">{selectedTransaction.creditedWallet}</p>
            </div>
          )}
          {selectedTransaction.debitedAmount && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Debited Amount</p>
              <p>{selectedTransaction.debitedCurrency}{formatAmount(selectedTransaction.debitedAmount)}</p>
            </div>
          )}
          {selectedTransaction.debitWallet && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Debited Wallet</p>
              <p className="text-xs">{selectedTransaction.debitedWallet}</p>
            </div>
          )}
          {selectedTransaction.rateDescription && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Rate</p>
              <p>{selectedTransaction.rateDescription}</p>
            </div>
          )}
          {selectedTransaction.sellerCreditedWallet && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Seller Credited Wallet</p>
              <p className="text-xs">{selectedTransaction.sellerCreditedWallet}</p>
            </div>
          )}
          {selectedTransaction.sellerDebitedWallet && (
            <div className="flex justify-between text-sm border border-gray-300 py-2 px-4 rounded-sm">
              <p>Seller Debited Wallet</p>
              <p className="text-xs">{selectedTransaction.sellerDebitedWallet}</p>
            </div>
          )}
          <div className="text-center text-sm border border-gray-300 py-2 px-4 rounded-sm">
            <p>Description</p>
            <p>{selectedTransaction.description}</p>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}

export default PouchWallet;