import { useEffect, useState } from "react";
import Button from "../../../../components/ui/button";
import SelectField from "../../../../components/ui/select";
import useSettingsTitle from "../../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../../services/api/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../../services/hooks/useTitle";
import TextButton from "../../../../components/ui/textButton";
import { CURRENCIES } from "../../../../data/currencies";

const INITIAL_PAIRS = [
  { fromCurrency: "NGN", toCurrency: "USD", rate: "0.0056", id: 1 },
]

function AdminSetCurrencies() {
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, adminMsg} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate, navigate);

  const [pairs, setPairs] = useState(INITIAL_PAIRS)
  
  useEffect(() => {
    setAppTitle('Admin');
  }, []);

  useEffect(() => {
    setSettingsTitle('Currency Management');
  }, []);

  const addPair = () => {
    setPairs([
      ...pairs,
      {
        fromCurrency: "NGN",
        toCurrency: "USD",
        rate: "0.0000",
        id: Date.now(),
      },
    ])
  }

  const removePair = (id) => {
    setPairs(pairs.filter((pair) => pair.id !== id))
  }

  const updatePair = (id, field, value) => {
    setPairs(pairs.map((pair) => (pair.id === id ? { ...pair, [field]: value } : pair)))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = pairs.map(({id, ...rest}) => rest);
    adminService.createDefaultExchangeRate(dataToSend, dispatch);
  }

  if (error) toast.error(error);

  if (adminMsg) toast.success(adminMsg);

  return (
    <div className="w-full p-5 rounded-sm shadow-sm space-y-5">
      <h2 className="text-primary dark:text-white text-lg lg:text-xl font-[600]">Set Default Exchange Currency</h2>
      <div className="space-y-6">
        <div className="flex flex-col gap-5">
          {pairs.map((pair) => (
            <div key={pair.id} className="grid grid-cols-10 gap-4 lg:gap-8 text-xs lg:text-sm text-primary dark:text-white font-[600]">
              <div className="col-span-6 lg:col-span-4 border border-gray-300 shadow-md rounded-sm flex">
                <SelectField 
                  options={CURRENCIES}
                  id={pair.fromCurrency}
                  value={pair.fromCurrency}
                  onChange={(e) => updatePair(pair.id, "fromCurrency", e.target.value)}
                  placeholder="Select"
                  className='py-1 px-2 flex-1'
                  border='border-r border-r-gray-300'
                />
                <SelectField 
                  options={CURRENCIES}
                  id={pair.toCurrency}
                  value={pair.toCurrency}
                  onChange={(e) => updatePair(pair.id, "toCurrency", e.target.value)}
                  placeholder="Select"
                  className='py-1 px-2 flex-1'
                  border='border-none'
                />
              </div>

              <input
                type="number"
                value={pair.rate}
                onChange={(e) => updatePair(pair.id, "rate", e.target.value)}
                className="col-span-3 lg:col-span-5 py-1 px-2 rounded-sm shadow-sm border border-gray-300"
                step="0.0001"
              />
              <TextButton
                onClick={() => removePair(pair.id)}
                variant="danger"
              >
                x
              </TextButton>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <TextButton 
            onClick={addPair}
            variant="primary"
            className='text-xs lg:text-lg border rounded-sm px-2 py-1'
          >
            Add +
          </TextButton>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-66 lg:w-96">
          <Button
            variant="primary"
            onClick={handleSubmit}
            className='font-[500]'
            disabled={loading}
          >
            {loading ? 'Saving' : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdminSetCurrencies;

