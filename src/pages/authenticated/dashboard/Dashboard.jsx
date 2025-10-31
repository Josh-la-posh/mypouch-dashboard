import { useEffect, useState } from "react";
import { RefreshCcw, TrendingUp } from "lucide-react";
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
import RatesCarousel from "../../../components/RatesCarousel";
import { CURRENCIES } from "../../../data/currencies";
import SummaryCardsTabs from "../../../components/SummaryCardsTabs";

const Dashboard = () => {
  const {auth} = useAuth();
  const dispatch = useDispatch();
  const {setAppTitle} = useTitle();
  const axiosPrivate = useAxiosPrivate();
  const {loading, error, transactionStat, rateLoading, rateError, rates} = useSelector((state) => state.dashboard);
  const dashboardService = new DashboardService(axiosPrivate);
  const [transactions, setTransactions] = useState(transactionStat);
  const [currency, selectCurrency] = useState('USD');

  const loadUserStat = async () => {
    await dashboardService.fetchUserStat(dispatch);
  }

  const loadCurrencyRate = async () => {
    await dashboardService.fetchtCurrencyRates(currency, dispatch);
  }

  // Balance loads now handled within SummaryCardsTabs

  useEffect(() => {
    setAppTitle('Dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadUserStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    loadCurrencyRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, dispatch]);

  // Balance loading handled in reusable component.

  useEffect(() => {
    setTransactions(transactionStat);
  }, [transactionStat]);

  const onRefresh = () => {
    loadUserStat();
  };

  const onRefreshRate = () => {
    loadCurrencyRate();
  };

  // Refresh handlers for balances now internal to SummaryCardsTabs

  if (loading) return <Spinner />

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="space-y-10">
      <h1 className="text-md font-[500] dark:text-[#C2A6DD]">Welcome back {auth?.data?.firstName}</h1>
      <SummaryCardsTabs />
      <div className="md:grid grid-cols-5 space-y-10">
        <div className="col-span-3">
          <div className="">
            <div className="flex items-center justify-around h-5">
              <SelectField
                options={CURRENCIES}
                placeholder=""
                value={currency}
                onChange={(e) => selectCurrency(e.target.value)}
              />
              <p className="text-xs font-[600] text-center dark:text-[#C2A6DD]">Daily Exchange Rate</p>
              <TextButton
                onClick={onRefreshRate}
              >
                <RefreshCcw size='16px'/>
              </TextButton>
            </div>
            <div className="mt-10 space-y-2 flex flex-col items-center">
              {rateLoading && <Spinner />}
              <RatesCarousel
                rates={rates}
                loading={rateLoading}
                error={rateError}
                onRefresh={onRefreshRate}
                onRetry={onRefreshRate}
                autoplay
                interval={5000}
              />
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