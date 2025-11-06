import { useEffect, useState, useMemo, useCallback } from "react";
import Button from "../../../../components/ui/button";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../../services/api/adminApi";
import { toast } from "react-toastify";
import ErrorLayout from "../../../../components/ui/error_page";
import Spinner from "../../../../components/ui/spinner";
import { BaggageClaim, Edit, MoveRight, Trash } from "lucide-react";
import useTitle from "../../../../services/hooks/useTitle";
import TextButton from "../../../../components/ui/textButton";
import CustomModal from "../../../../components/ui/custom-modal";
import { CustomTab } from "../../../../components/ui/tabs";
import AdminSetCurrencies from "./AdminSetCurrencies";
import CurrencyHistory from "./CurrencyHistory";

function AdminViewSetCurrencies() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, deleteLoading, currencies, isUpdating} = useSelector((state) => state.admin);
  const adminService = useMemo(() => new AdminService(axiosPrivate), [axiosPrivate]);
  const TABS = [
    { value: 'list', label: 'Default Currency List' },
    { value: 'add', label: 'Add New Currency' },
    { value: 'history', label: 'Currency History' },
  ];
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const [pairs, setPairs] = useState({ fromCurrency: "NGN", toCurrency: "USD", rate: "0.0056"});
  const [isModalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
    
  useEffect(() => {
    setAppTitle('Admin');
  }, [setAppTitle]);
    
  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, [setSettingsTitle]);

  const fetchCurrencies = useCallback(async () => {
    await adminService.fetchDefaultExchangeRate(dispatch);
  }, [adminService, dispatch]);

  useEffect(() => {
    fetchCurrencies();
  }, [fetchCurrencies]);

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
    <div className="space-y-6 w-full">
      <CustomTab
        TABS={TABS}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabClassName='px-3 py-2 flex justify-around border'
        activeClassName='border-none font-bold'
        inactiveClassName='text-primary font-bold'
      >
        {activeTab === 'list' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-black/75 dark:text-white/80 text-md lg:text-xl font-[600]">Default Currency List</h2>
              <div className='text-[11px] opacity-70'>Total: {currencies?.length || 0}</div>
            </div>
            {currencies && currencies.map((cur) => (
              <div key={cur.id} className="grid grid-cols-7 gap-3 items-center">
                <div className="text-sm lg:text-md col-span-6 flex items-center justify-between gap-4 lg:gap-8 text-primary-dark border rounded-sm px-5 lg:px-8 py-2 lg:py-4 dark:bg-white">
                  <div className="flex items-center gap-3"><BaggageClaim size='13px' />{cur?.fromCurrency}</div>
                  <div><MoveRight size='28px'/></div>
                  <div className="flex items-center gap-3"><BaggageClaim size='13px' />{cur?.toCurrency}</div>
                  <Button disabled variant="secondary" className='text-xs lg:text-lg'>
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
            ))}
          </div>
        )}
        {activeTab === 'add' && (
          <div className='pt-2'><AdminSetCurrencies embedded /></div>
        )}
        {activeTab === 'history' && (
          <div className='pt-2'><CurrencyHistory /></div>
        )}
      </CustomTab>
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
          <div>
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
  );
}

export default AdminViewSetCurrencies;

