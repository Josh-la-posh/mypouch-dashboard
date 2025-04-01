import { useEffect, useState } from "react";
import Button from "../../../../components/ui/button";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../../services/api/adminApi";
import { toast } from "react-toastify";
import ErrorLayout from "../../../../components/ui/error_page";
import Spinner from "../../../../components/ui/spinner";
import { Link } from "react-router-dom";
import { BaggageClaim, Edit, MoveRight, Trash } from "lucide-react";
import useTitle from "../../../../services/hooks/useTitle";
import TextButton from "../../../../components/ui/textButton";
import CustomModal from "../../../../components/ui/custom-modal";

function AdminViewSetCurrencies() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, deleteLoading, currencies, isUpdating} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
  const [pairs, setPairs] = useState({ fromCurrency: "NGN", toCurrency: "USD", rate: "0.0056"});
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, []);
    
  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, []);

  const fetchCurrencies = async () => {
    await adminService.fetchDefaultExchangeRate(dispatch);
  }

  useEffect(() => {
    fetchCurrencies();
  }, [])

  const onRefresh = () => {
    fetchCurrencies();
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    adminService.deleteDefaultExchangeRate(id, dispatch);
  }

  const handleEdit = (e, cur) => {
    e.preventDefault();
    setPairs({
      fromCurrency: cur.fromCurrency,
      toCurrency: cur.toCurrency,
      rate: cur.rate
    });
    setModalOpen(true);
  }

  const updateRate = (e) => {
    setPairs((prev) => ({
      ...prev,
      rate: e.target.value
    }));
  }

  const submitEdit = (e) => {
    e.preventDefault();
    adminService.updateDefaultExchangeRate([pairs], dispatch);
  }

  if (loading) return <Spinner />;

  if (deleteLoading) toast.error('Deleting rate');

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  return (
    <div className="flex">
      <div className="w-full px-5 rounded-sm space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-black/75 dark:text-white/80 text-md lg:text-xl font-[600]">Default Currency List</h2>
          <Link
              to='/admin/currency/set-currencies'
              className="bg-primary font-[600] py-2 lg:py-3 px-4 lg:px-6 text-white rounded-sm text-xs lg:text-sm"
          >
              <span className="hidden lg:block">Add New Currency</span>
              <span className="block lg:hidden">Add</span>
          </Link>
        </div>
        {
          currencies && (
              currencies.map((cur) => (
                  <div key={cur.id} className="grid grid-cols-7 gap-3 items-center">
                    <div className="text-sm lg:text-md col-span-6 flex items-center justify-between gap-4 lg:gap-8 text-primary-dark border rounded-sm px-5 lg:px-8 py-2 lg:py-4 dark:bg-white">
                      <div className="flex items-center gap-3"><BaggageClaim size='13px' />{cur?.fromCurrency}</div>
                      <div className=""><MoveRight size='28px'/></div>
                      <div className="flex items-center gap-3"><BaggageClaim size='13px' />{cur?.toCurrency}</div>
                      <Button
                        disabled={true}
                        variant="secondary"
                        className='text-xs lg:text-lg'
                      >
                        {cur.rate > 1 ? Number(cur?.rate).toFixed(2) : cur?.rate}
                      </Button>
                    </div>
                      <div className="flex gap-2">
                        <TextButton
                            variant="danger"
                            className='cursor-pointer'
                            onClick={(e) => handleDelete(e, cur?.id)}
                            disabled={deleteLoading}
                        >
                            <Trash />
                        </TextButton>
                        <TextButton
                            variant="primary"
                            className='cursor-pointer'
                            onClick={(e) => handleEdit(e, cur)}
                            disabled={deleteLoading}
                        >
                            <Edit />
                        </TextButton>

                      </div>
                  </div>
              ))
          )
        }
      </div>      
      <CustomModal isOpen={isModalOpen} title="Update Currency Pair" onClose={closeModal}>
      <div className="space-y-6">
        <div className="flex border border-primary rounded-sm">
          <div className="text-center flex-1 border-r border-r-primary py-2">{pairs.fromCurrency}</div>
          <div className="text-center flex-1 py-2">{pairs.toCurrency}</div>
        </div>
        <input
          type="number"
          value={pairs.rate}
          onChange={updateRate}
          className="w-full py-1 px-2 rounded-sm border border-gray-300"
          step="0.0001"
        />
        <div className="">
          <Button
            className='text-xs'
            onClick={submitEdit}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating ...' : 'Update'}
          </Button>
        </div>
      </div>
      </CustomModal>
    </div>
  )
}

export default AdminViewSetCurrencies;

