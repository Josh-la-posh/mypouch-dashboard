import { useEffect, useState } from 'react';
import useTitle from '../../../../services/hooks/useTitle';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import TextButton from '../../../../components/ui/textButton';
import Card from '../../../../components/ui/card';
import SelectField from '../../../../components/ui/select';
import InputField from '../../../../components/ui/input';
import Button from '../../../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { CURRENCIES } from '../../../../data/currencies';
import { toast } from 'react-toastify';
import RedirectToLink from './redirect-link.jsx';
import StatusBadge from '../../../../components/ui/status-badge.jsx';
import { dateFormatter } from '../../../../utils/dateFormatter.jsx';
import Spinner from '../../../../components/ui/spinner.jsx';
import { UserTable } from '../../../../components/user-table.jsx';
import { Printer } from 'lucide-react';
import CustomModal from '../../../../components/ui/custom-modal.jsx';
import { TRANSACTIONSTATUS } from '../../../../data/transaction-status.jsx';
import { TRANSACTIONTYPE } from '../../../../data/transaction-type.jsx';

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
    const adminService = new AdminService(axiosPrivate, navigate);
    const {adminCurrencies, isFundingAdminWallet, isGottenLink, fundingWalletLink, adminCurrenciesLoading, currentPage, pouchTransactionLoading, totalPages, pouchTransaction} = useSelector((state) => state.admin);
    const [addWallet, setAddWallet] = useState(false);
    const [fundWallet, setFundWallet] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [fundAmount, setFundAmount] = useState('0');
    const [userCurrentPage, setUserCurrentPage] = useState(currentPage);
    const [userTotalPages, setUserTotalPages] = useState(totalPages);
    const [userPageSize, setUserPageSize] = useState('10');
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState({});
    const [status, setStatus] = useState('All');
    const [type, setType] = useState('All');
    const [date, setDate] = useState('');
  
    const openModal = (val) => {
      setSelectedTransaction(val);
      setModalOpen(true);
    };
    const closeModal = () => setModalOpen(false);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);

  useEffect(() => {
    setSettingsTitle('Pouch Wallet');
  }, []);

  const loadCurrencies = async (cur) => {
    await adminService.fetchPouchWallets(cur, dispatch);
  }

  const loadPouchTransactions = async (date, type, status, page, limit) => {
    const finalStatus = status === 'All' ? '' : status;
    const finalType = type === 'All' ? '' : type === 'System Exchange' ? 'SystemExchange' : type;
    await adminService.fetchPouchTransactions(date, finalType, finalStatus, page, limit, dispatch);
  }

  useEffect(() => {
    loadCurrencies('');
    loadPouchTransactions('', '', '', '1', '10')
  }, [dispatch]);

  useEffect(() => {
    loadPouchTransactions('', '', '', '1', '10')
  }, [dispatch, userCurrentPage, userPageSize]);
  
    useEffect(() => {
      setUserCurrentPage(currentPage);
    }, [currentPage]);
  
    useEffect(() => {
      setUserTotalPages(totalPages);
    }, [totalPages]);

  const updateFundWalletOption = () => {
    setFundWallet(!fundWallet);
    setAddWallet(false);
  }

  const updateAddWalletOption = () => {
    setAddWallet(!addWallet);
    setFundWallet(false);
  }

  const handleFundWallet = async () => {
    const formData = {
        'amount': fundAmount,
        'currency': selectedCurrency
    }

    if (fundAmount === '') {
        return toast.error('Enter a valid amount');
    }

    if (fundAmount === '0') {
        return toast.error('Amount must be greater than 0');
    }

    await adminService.fundAdminWallet(formData, dispatch);
  }

  const handleAddWallet = async () => {
    await adminService.createAdminWallet(dispatch);
  }

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setStatus(value);
  }

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setType(value);
  }

  const cardColor = 'bg-[#F1F8FF]';

  return (
    <div className='space-y-10 w-full'>
        <div className="flex justify-end gap-5">
            <TextButton
                onClick={updateAddWalletOption}
                className='border border-primary p-2'
            >
                Add Wallet
            </TextButton>
            <TextButton
                onClick={updateFundWalletOption}
                className='border border-primary p-2'
            >
                Fund Wallet
            </TextButton>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 overflow-x-scroll scrollbar-none">
            {
                adminCurrencies && adminCurrencies.map((cur) => (
                    <div key={cur.id} className="w-full flex-1">
                        <Card
                            icon={cur?.currency}
                            iconClassName='w-5 md:w-8 h-5 md:h-8 text-[7px] md:text-[9px] font-[700] rounded-full flex items-center justify-center bg-[#D0CDE1]/30'
                            className='w-full'
                            amount={cur?.balance}
                            name='Total balance'
                            rate=''
                            color={cardColor}
                        />
                    </div>
                ))
            }
        </div>

        {
            addWallet &&
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
        }

        {
            !isGottenLink ?
            (fundWallet && 
            <div className="w-full pt-10 border-t border-app-bg dark:border-[#20263D]">
                <div className="max-w-[400px] space-y-5">
                    <SelectField
                        label='Select your preferred currency'
                        options={CURRENCIES}
                        value={selectedCurrency}
                        placeholder=''
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        selectClassName={'bg-primary/14'}
                    />    
                    <InputField
                        label='Enter amount'
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
            </div>)
            : <RedirectToLink externalLink={fundingWalletLink}/>
        }

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

        {
            pouchTransactionLoading 
            ? <Spinner /> 
            : <UserTable
                data={pouchTransaction}
                columns={columns}
                totalPages={userTotalPages}
                currentPage={userCurrentPage}
                setCurrentPage={setUserCurrentPage}
                rowsPerPage={userPageSize}
                setRowsPerPage={setUserPageSize}
            />
        }
        
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
  )
}

export default PouchWallet;