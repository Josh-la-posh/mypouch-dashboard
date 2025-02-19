import { useEffect, useState } from "react";
import TextButton from "../../../components/ui/textButton";
import Button from "../../../components/ui/button";
import SelectField from "../../../components/ui/select";
import useSettingsTitle from "../../../services/hooks/useSettitngsTitle";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import AdminService from "../../../services/api/adminApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const INITIAL_PAIRS = [
  { fromCurrency: "NGN", toCurrency: "USD", rate: "0.0056", id: 1 },
]

const CURRENCIES = ["NGN", "USD", "CAD", "GBP", "EUR"]

function AdminSetCurrencies() {
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, adminMsg} = useSelector((state) => state.admin);
  const adminService = new AdminService(axiosPrivate, navigate);

  const [pairs, setPairs] = useState(INITIAL_PAIRS)
    
  useEffect(() => {
    setSettingsTitle('Set Currencies');
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
      <h2 className="text-primary text-xl font-[600]">Set Default Exchange Currency</h2>
      <div className="space-y-6">
        <div className="flex flex-col gap-5">
          {pairs.map((pair) => (
            <div key={pair.id} className="grid grid-cols-10 gap-8 text-sm text-primary font-[600]">
              <div className="col-span-4 border border-gray-300 shadow-md rounded-sm flex">
                <SelectField 
                  options={CURRENCIES}
                  id={pair.fromCurrency}
                  value={pair.fromCurrency}
                  onChange={(e) => updatePair(pair.id, "fromCurrency", e.target.value)}
                  placeholder="Select"
                  className='py-1 px-2 border-r border-r-gray-300 flex-1'
                />
                <SelectField 
                  options={CURRENCIES}
                  id={pair.toCurrency}
                  value={pair.toCurrency}
                  onChange={(e) => updatePair(pair.id, "toCurrency", e.target.value)}
                  placeholder="Select"
                  className='py-1 px-2 border-r border-r-gray-300 flex-1'
                />
              </div>

              <input
                type="number"
                value={pair.rate}
                onChange={(e) => updatePair(pair.id, "rate", e.target.value)}
                className="col-span-5 py-1 px-2 rounded-sm shadow-sm border border-gray-300"
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
            className='border rounded-sm px-2 py-1'
          >
            Add +
          </TextButton>
        </div>
      </div>
      <div className="">
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
  )
}

export default AdminSetCurrencies;

