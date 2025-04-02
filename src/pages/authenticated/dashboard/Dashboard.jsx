import { useEffect, useState } from "react";
import Card from "../../../components/ui/card";
import { Loader, RefreshCcw, TrendingUp } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import DashboardService from "../../../services/api/dashboardApi";
import Spinner from "../../../components/ui/spinner";
import ErrorLayout from "../../../components/ui/error_page";
import useAuth from "../../../services/hooks/useAuth";
import DashboardTransactions from "./Transactions";
import useTitle from "../../../services/hooks/useTitle";
import SelectField from "../../../components/ui/select";
import TextButton from "../../../components/ui/textButton";
import Button from "../../../components/ui/button";
import { CURRENCIES } from "../../../data/currencies";

const Dashboard = () => {
  const {auth} = useAuth();
  const dispatch = useDispatch();
  const {setAppTitle} = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, totalUsers, transactionStat, rateLoading, rateError, rates} = useSelector((state) => state.dashboard);
  const dashboardService = new DashboardService(axiosPrivate);
  const [data, setData] = useState(totalUsers);
  const [transactions, setTransactions] = useState(transactionStat);
  const [currency, selectCurrency] = useState('USD');

  const loadUserStat = async () => {
    await dashboardService.fetchUserStat(dispatch);
  }

  const loadCurrencyRate = async () => {
    await dashboardService.fetchtCurrencyRates(currency, dispatch);
  }

  useEffect(() => {
    setAppTitle('Dashboard');
  }, []);

  useEffect(() => {
    loadUserStat();
  }, [dispatch]);

  useEffect(() => {
    loadCurrencyRate();
  }, [currency, dispatch]);

  useEffect(() => {
    setData(totalUsers);
  }, [totalUsers]);

  useEffect(() => {
    setTransactions(transactionStat);
  }, [transactionStat]);

  const onRefresh = () => {
    loadUserStat();
  };

  const onRefreshRate = () => {
    loadCurrencyRate();
  };

  if (loading) return <Spinner />

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="space-y-10">
      <h1 className="text-md font-[500] dark:text-[#C2A6DD]">Welcom back {auth?.data?.firstName}</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-x-scroll scrollbar-none">
        <Card
          icon={<Loader size='22px' />}
          amount={data?.statuses?.active?.current}
          name="Active Users"
          rate={Number(data?.statuses?.active?.change).toFixed(2)}
          color="text-green-600"
        />
        <Card
          icon={<Loader size='22px' />}
          amount={data?.statuses?.inactive?.current}
          name="Inactive Users"
          rate={Number(data?.statuses?.inactive?.change).toFixed(2)}
          color="text-gray-600"
        />
        <Card
          icon={<Loader size='22px' />}
          amount={data?.statuses?.blocked?.current}
          name="Blocked Users"
          rate={Number(data?.statuses?.blocked?.change).toFixed(2)}
          color="text-black"
        />
        <Card
          icon={<Loader size='22px' />}
          amount={data?.statuses?.blocked?.current}
          name="Deleted Users"
          rate={Number(data?.statuses?.deleted?.change).toFixed(2)}
          color="text-danger"
        />
      </div>
      <div className="md:grid grid-cols-5 space-y-10">
        <div className="col-span-3">
          <div className="">
            <div className="flex items-center justify-around h-5">
              <SelectField
                textColor='text-primary'
                options={CURRENCIES}
                placeholder=""
                value={currency}
                onChange={(e) => selectCurrency(e.target.value)}
                selectClassName={'bg-primary/14 text-primary text-sm border-transparent dark:border-gray-300 rounded-sm py-2'}
              />
              <p className="text-xs font-[600] text-center dark:text-[#C2A6DD]">Daily Exchange Rate</p>
              <TextButton
                onClick={onRefreshRate}
              >
                <RefreshCcw size='16px'/>
              </TextButton>
            </div>
            <div className="mt-4 space-y-2 flex flex-col items-center">
              {rateError 
                ? (
                <div className="space-y-5 flex flex-col items-center my-10">
                  <p className="text-primary">Unable to load data</p>
                  <div className="w-[120px]">
                    <Button
                      variant="primary"
                      className='text-xs'
                      onClick={onRefreshRate}
                    >
                      Retry                      
                    </Button>
                  </div>
                </div>)
                : 
                Object.entries(rates).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-xs bg-primary dark:bg-white px-3 py-1 rounded-sm w-[80%]">
                    <p className="text-white dark:text-primary-dark">1 {currency}</p>
                    <p className="text-white dark:text-primary-dark">{value} {key}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="md:mt-0 col-span-2">
          <div className="">
            <p className="text-xs font-[600] text-center dark:text-[#C2A6DD] h-5">The Most Traded Currency</p>
            <div className="mt-4 space-y-2 flex flex-col items-center">
              {transactions.map((cur) => (
                  <div key={cur.currency} className="flex items-center justify-between text-xs bg-primary dark:bg-white px-3 py-1 rounded-sm w-[80%]">
                    <p className="text-white dark:text-primary-dark">{cur?.currency}</p>
                    <div className={`flex items-center gap-4 ${cur?.change.toString()[0] == '-' ? 'text-danger' : 'text-color-green'}`}>
                      <div className=""><TrendingUp size='15px' /></div>
                      <p>{cur.change}%</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

        </div>
      </div>

      <div className="">
        <DashboardTransactions />
      </div>
    </div>
  );
};

export default Dashboard;