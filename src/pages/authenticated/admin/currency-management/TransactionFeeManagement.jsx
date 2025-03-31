import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import AdminService from '../../../../services/api/adminApi';
import { toast } from 'react-toastify';
import InputField from '../../../../components/ui/input';
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import useTitle from '../../../../services/hooks/useTitle';

function TransactionFeeManagement() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, exchangeLimit} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [deviation, setDeviation] = useState(exchangeLimit);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);

//   const fetchDeviation = async () => {
//     await adminService.fetchCurrencyExchangelimit(dispatch);
//   }
    
  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, []);

//   useEffect(() => {
//     fetchDeviation();
//   }, [])

//   useEffect(() => {
//     setDeviation(exchangeLimit);
//   }, [exchangeLimit])

//   const onRefresh = () => {
//     fetchDeviation();
//   }

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
    <div className='lg:pl-10 w-full pt-10'>
      <div className="max-w-[400px] space-y-6">
        <p className='text-primary text-sm font-[600] border-b border-b-primary/20 pb-3'>A percentage fee will be applied to every transaction a user completes on the app</p>
        <div className="">
            <form onSubmit={handleSubmit} className='space-y-6'>
              <InputField
                  label='Service Fee Percentage'
                  textColor='text-primary'
                  id='deviation'
                  placeholder='Enter your %'
                  inputClassName='bg-primary/14 text-sm py-2'
                  value={String(deviation ?? "10%")}
                  onChange={(e) => setDeviation(e.target.value)}
              />
              <div className="flex gap-8">
                <Button
                  variant='primary'
                  disabled={loading}
                >
                  {loading ? 'Confirming ...' : 'Confirm'}
                </Button>
              </div>
            </form>
        </div>
      </div>
      
    </div>
  )
}

export default TransactionFeeManagement;