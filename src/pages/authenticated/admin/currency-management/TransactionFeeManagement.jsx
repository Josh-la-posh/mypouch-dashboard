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
  const {loading, error, commissionRate} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [commission, setCommission] = useState(commissionRate);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);

  const fetchCommissionRate = async () => {
    await adminService.fetchCommissionRate(dispatch);
  }
    
  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, []);

  useEffect(() => {
    fetchCommissionRate();
  }, [])

  useEffect(() => {
    setCommission(commissionRate);
  }, [commissionRate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {"commission": commission}
    await adminService.setCommissionRate(formData, dispatch);
    setCommission('');
  }

  return (
    <div className='lg:pl-10 w-full pt-10'>
      <div className="max-w-[400px] space-y-6">
        <p className='text-black/70 dark:text-white/60 text-sm font-[600] border-b border-b-primary/20 pb-3'>A percentage fee will be applied to every transaction a user completes on the app</p>
        <div className="">
            <form onSubmit={handleSubmit} className='space-y-6'>
              <InputField
                  label='Service Fee Percentage'
                  id='commission'
                  placeholder='Enter your %'
                  value={String(commission ?? "10")}
                  onChange={(e) => setCommission(e.target.value)}
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