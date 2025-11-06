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
      {/* Rates & Most Traded Section */}
      <div className="grid md:grid-cols-5 gap-6">
        {/* Daily Exchange Rate Panel */}
        <div className="md:col-span-3 bg-white dark:bg-[#20263D] border border-gray-200 dark:border-gray-600 rounded-sm p-4 space-y-1 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-semibold dark:text-[#C2A6DD]">Daily Exchange Rate</p>
              <TextButton onClick={onRefreshRate} className="text-[11px]" aria-label="Refresh rates">
                <RefreshCcw size='14px' />
              </TextButton>
            </div>
            <div className="w-[130px]">
              <SelectField
                options={CURRENCIES}
                placeholder="Currency"
                value={currency}
                onChange={(e) => selectCurrency(e.target.value)}
                selectClassName="bg-white dark:bg-[#20263D]"
              />
            </div>
          </div>
          <div className="relative min-h-[160px] flex flex-col items-center justify-center">
            {rateLoading && <Spinner />}
            {rateError && !rateLoading && (
              <ErrorLayout errMsg={rateError} handleRefresh={onRefreshRate} />
            )}
            {!rateLoading && !rateError && (
              <RatesCarousel
                rates={rates}
                loading={rateLoading}
                error={rateError}
                onRefresh={onRefreshRate}
                onRetry={onRefreshRate}
                autoplay
                interval={5000}
              />
            )}
          </div>
        </div>

        {/* Most Traded Currency Panel */}
        <div className="md:col-span-2 bg-white dark:bg-[#20263D] border border-gray-200 dark:border-gray-600 rounded-sm p-4 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold dark:text-[#C2A6DD]">Most Traded Currency</p>
            <TextButton onClick={onRefresh} className="text-[11px]" aria-label="Refresh stats">
              <RefreshCcw size='14px' />
            </TextButton>
          </div>
          <div className="space-y-2">
            {transactions && transactions.length > 0 ? transactions.map((cur) => {
              const negative = cur?.change?.toString().startsWith('-');
              return (
                <div key={cur.currency} className="group flex items-center w-full text-[11px] rounded-sm overflow-hidden">
                  {/* Bar background */}
                  <div className={`flex items-center justify-between w-full px-4 py-2 bg-primary dark:bg-[#1C2034] transition-colors group-hover:bg-primary/90`}> 
                    <p className="text-white dark:text-[#C2A6DD] font-medium tracking-wide">{cur?.currency}</p>
                    <div className={`flex items-center gap-2 ${negative ? 'text-red-400' : 'text-green-300'}`}>
                      <TrendingUp size='13px' className={`${negative ? 'rotate-180' : ''}`} />
                      <p className="font-semibold">{cur.change}%</p>
                    </div>
                  </div>
                </div>
              )
            }) : (
              <p className="text-[11px] text-gray-500 dark:text-gray-400">No trading data available.</p>
            )}
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