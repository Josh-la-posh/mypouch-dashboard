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
  const {loading, error} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [formData, setFormData] = useState({
    maxPercentage: '',
    minPercentage: ''
  });
    
  useEffect(() => {
    setSettingsTitle('Currency Exchange Limit');
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminService.setCurrencyExchangelimit(formData, dispatch);
    setFormData({});
  }

  if (error) toast.error(error);

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-primary text-xl font-[600] '>Currency Exchange Limit</p>
      
      <p className='text-primary text-sm font-[600] border-b border-b-primary/20 pb-3'>Setting a limit for currency exchange</p>
      <div className="">
        <form onSubmit={handleSubmit} className='space-y-6'>
          <InputField
            label='Maximum Percentage'
            textColor='text-primary'
            id='maxPercentage'
            placeholder='Enter your %'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.maxPercentage}
            onChange={handleChange}
          />
          <InputField
            label='Minimum Percentage'
            textColor='text-primary'
            id='minPercentage'
            placeholder='Enter your %'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.minPercentage}
            onChange={handleChange}
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