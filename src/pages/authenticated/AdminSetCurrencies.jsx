import { useEffect, useState } from "react"
import TextButton from "../../components/ui/textButton"
import Button from "../../components/ui/button"
import SelectField from "../../components/ui/select"
import useSettingsTitle from "../../services/hooks/useSettitngsTitle"

const INITIAL_PAIRS = [
  { from: "NGN", to: "USD", rate: "0.0056", id: 1 },
  { from: "NGN", to: "CAD", rate: "0.765", id: 2 },
  { from: "NGN", to: "GBP", rate: "0.365", id: 3 },
  { from: "NGN", to: "CAD", rate: "0.679", id: 4 },
]

const CURRENCIES = ["NGN", "USD", "CAD", "GBP", "EUR", "JPY", "AUD"]

function AdminSetCurrencies() {
  const { setSettingsTitle } = useSettingsTitle();
  const [pairs, setPairs] = useState(INITIAL_PAIRS)
    
  useEffect(() => {
    setSettingsTitle('Set Currencies');
  }, []);

  const addPair = () => {
    setPairs([
      ...pairs,
      {
        from: "NGN",
        to: "USD",
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

  return (
    <div className="w-full p-5 rounded-sm shadow-sm space-y-5">
      <h2 className="text-primary text-md font-[600]">Set Default Exchange Currency</h2>
      <div className="flex flex-col gap-5">
        {pairs.map((pair) => (
          <div key={pair.id} className="grid grid-cols-10 gap-8 text-sm text-primary font-[600]">
            <div className="col-span-4 border border-gray-300 shadow-md rounded-sm flex">
              <SelectField 
                options={CURRENCIES}
                value={pair.from}
                onChange={(e) => updatePair(pair.id, "from", e.target.value)}
                placeholder="Select"
                className='py-1 px-2 border-r border-r-gray-300 flex-1'
              />
              <SelectField 
                options={CURRENCIES}
                value={pair.to}
                onChange={(e) => updatePair(pair.id, "to", e.target.value)}
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

      <div className="flex gap-5">
        <Button
          variant="primary"
          onClick={addPair}
          className='font-[500]'
        >
          Confirm
        </Button>
        <Button
          variant="danger"
          // onClick={}
          className='font-[500]'
        >
          Cancel
        </Button>
        {/* <button className="bg-primary-light text-primary hover:bg-primary-dark hover:text-white">Confirm</button>
        <button className="border border-danger hover:bg-danger hover:text-white">Cancel</button> */}
      </div>
    </div>
  )
}

export default AdminSetCurrencies;

