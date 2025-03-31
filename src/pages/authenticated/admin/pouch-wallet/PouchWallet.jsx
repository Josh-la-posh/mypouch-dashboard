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
import { Link, useNavigate } from 'react-router-dom';
import { CURRENCIES } from '../../../../data/currencies';
import { toast } from 'react-toastify';
import RedirectToLink from './redirect-link.jsx';

function PouchWallet() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const adminService = new AdminService(axiosPrivate, navigate);
  const {adminCurrencies, isFundingAdminWallet, isGottenLink, fundingWalletLink, adminCurrenciesLoading, adminCurrenciesError} = useSelector((state) => state.admin);
  const [addWallet, setAddWallet] = useState(false);
  const [fundWallet, setFundWallet] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [fundAmount, setFundAmount] = useState('0');
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);

  useEffect(() => {
    setSettingsTitle('Pouch Wallet');
  }, []);

  const loadCurrencies = async (cur) => {
    await adminService.fetchAdminWallets(cur, dispatch);
  }

  useEffect(() => {
    loadCurrencies('');
  }, [dispatch]);

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

        <div className="grid grid-cols-3 gap-3 overflow-x-scroll scrollbar-none">
            {
                adminCurrencies && adminCurrencies.map((cur, index) => (
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
                            <Link
                                to='/admin/pouch-funding-success'
                            >Continue</Link>
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
                        textColor='text-primary dark:text-white'
                        options={CURRENCIES}
                        value={selectedCurrency}
                        placeholder=''
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        selectClassName={'bg-primary/14 text-primary text-sm border-transparent dark:border-gray-300 rounded-sm py-2'}
                    />    
                    <InputField
                        label='Enter amount'
                        textColor='text-primary dark:text-white'
                        id='fundAmount'
                        inputClassName='bg-primary/14 text-sm py-2'
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
    </div>
  )
}

export default PouchWallet;