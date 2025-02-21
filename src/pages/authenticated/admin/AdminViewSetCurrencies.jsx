import { useEffect, useState } from "react";
import TextButton from "../../../components/ui/textButton";
import Button from "../../../components/ui/button";
import useSettingsTitle from "../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../services/api/adminApi";
import { toast } from "react-toastify";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import { Link } from "react-router-dom";
import { BaggageClaim, MoveRight, Trash } from "lucide-react";

function AdminViewSetCurrencies() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, deleteLoading, currencies} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate);
    
  useEffect(() => {
    setSettingsTitle('Set Currencies');
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

  if (loading) return <Spinner />;

  if (deleteLoading) toast.error('Deleting rate');

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />;

  return (
    <div className="w-full px-5 rounded-sm shadow-sm space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-primary dark:text-[#C2A6DD] text-xl font-[600]">Default Currency List</h2>
        <Link
            to='/admin/set-currencies'
            className="bg-primary text-sm font-[600] py-3 px-6 text-white rounded-sm"
        >
            Add New Currency
        </Link>
      </div>
      {
        currencies && (
            currencies.map((cur) => (
                <div key={cur.id} className="grid grid-cols-7 gap-3 items-center">
                    <div className="col-span-6 flex items-center justify-between gap-8 text-primary-dark border rounded-sm px-8 py-4 dark:bg-white">
                        <div className="flex items-center gap-3"><BaggageClaim size='13px' />{cur?.fromCurrency}</div>
                        <div className=""><MoveRight size='28px'/></div>
                        <div className="flex items-center gap-3"><BaggageClaim size='13px' />{cur?.toCurrency}</div>
                        <Button
                            disabled={true}
                            variant="secondary"
                        >
                            {cur.rate > 1 ? Number(cur?.rate).toFixed(2) : cur?.rate}
                        </Button>
                    </div>
                    <div className="">
                        <TextButton
                            variant="danger"
                            className='bg-primary/46 px-6 py-3 rounded-sm cursor-pointer'
                            onClick={(e) => handleDelete(e, cur?.id)}
                            disabled={deleteLoading}
                        >
                            <Trash />
                        </TextButton>

                    </div>
                </div>
            ))
        )
      }
    </div>
  )
}

export default AdminViewSetCurrencies;

