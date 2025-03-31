import { useEffect } from 'react'
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import useTitle from '../../../../services/hooks/useTitle';

function AdminCurrency() {
    const {setAppTitle} = useTitle();
    const { setSettingsTitle } = useSettingsTitle();
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);
    
  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, []);
  return (
    <div className='lg:ml-10 lg:mt-10 space-y-4'>
        <Link
            to='/admin/currency/view-currencies'
            className='max-w-[450px] border border-primary dark:border-white hover:bg-primary text-primary dark:text-white hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
        >
            Available Currencies
            <ArrowRightIcon size='17px' />
        </Link>
        <Link
            to='/admin/currency/set-currencies'
            className='max-w-[450px] border border-primary dark:border-white hover:bg-primary text-primary dark:text-white hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
        >
            Register Currency
            <ArrowRightIcon size='17px' />
        </Link>
        <Link
            to='/admin/currency/exchange-limit'
            className='max-w-[450px] border border-primary dark:border-white hover:bg-primary text-primary dark:text-white hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
        >
            Trading Limits
            <ArrowRightIcon size='17px' />
        </Link>
        <Link
            to='/admin/currency/commission-rate'
            className='max-w-[450px] border border-primary dark:border-white hover:bg-primary text-primary dark:text-white hover:text-white text-sm lg:text-lg rounded-sm px-4 lg:px-6 py-2 lg:py-4 flex justify-between items-center'
        >
            Commission Rate
            <ArrowRightIcon size='17px' />
        </Link>




    </div>
  )
}

export default AdminCurrency;