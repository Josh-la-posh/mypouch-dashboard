import React, {useEffect, useState} from 'react'
import InputField from '../../../../components/ui/input'
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import { toast } from 'react-toastify';

function CurrencyExchangeLimit() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, exchangeLimit} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [deviation, setDeviation] = useState(exchangeLimit);

  const fetchDeviation = async () => {
    await adminService.fetchCurrencyExchangelimit(dispatch);
  }
    
  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, []);

  useEffect(() => {
    fetchDeviation();
  }, [])

  useEffect(() => {
    setDeviation(exchangeLimit);
  }, [exchangeLimit])

  const onRefresh = () => {
    fetchDeviation();
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {"deviation": deviation}
    await adminService.setCurrencyExchangelimit(formData, dispatch);
    setDeviation('');
  }

  if (error) toast.error(error);

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-primary dark:text-[#C2A6DD] text-xl font-[600] '>Currency Exchange Limit</p>
      
      <p className='text-primary text-sm font-[600] border-b border-b-primary/20 pb-3'>Setting a limit for currency exchange</p>
      <div className="">
        <form onSubmit={handleSubmit} className='space-y-6'>
          <InputField
            label='Set Percentage'
            textColor='text-primary'
            id='deviation'
            placeholder='Enter your %'
            inputClassName='bg-primary/14 text-sm py-2'
            value={String(deviation ?? "")}
            onChange={(e) => setDeviation(e.target.value)}
          />
          <div className="flex gap-8">
            <Button
              variant='primary'
              disabled={loading}
            >
              {loading ? 'Submitting' : 'Submit'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CurrencyExchangeLimit;