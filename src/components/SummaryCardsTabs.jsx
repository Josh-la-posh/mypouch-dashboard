import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../services/hooks/useAxiosPrivate';
import DashboardService from '../services/api/dashboardApi';
import Card from './ui/card';
import Spinner from './ui/spinner';
import ErrorLayout from './ui/error_page';
import { Loader } from 'lucide-react';
import { Tabs, TabsList, TabTrigger } from './ui/tabs';
import { formatAmount } from '../utils/amountFormmerter';

const SummaryCardsTabs = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const dashboardService = new DashboardService(axiosPrivate);
  const { totalUsers, loading, error, userBalance, userBalanceLoading, userBalanceError, pouchBalance, pouchBalanceLoading, pouchBalanceError } = useSelector((state) => state.dashboard);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [userBalanceMetric, setUserBalanceMetric] = useState('totalBalance');
  const balanceMetricOptions = ['availableBalance', 'holdingBalance', 'totalBalance'];
  const balanceMetricLabels = {
    availableBalance: 'Available Balance',
    holdingBalance: 'Holding Balance',
    totalBalance: 'Total Balance'
  };
  const [pouchBalanceMetric, setPouchBalanceMetric] = useState('balance');
  const pouchMetricOptions = ['balance', 'pendingWithdrawals'];
  const pouchMetricLabels = {
    balance: 'Balance',
    pendingWithdrawals: 'Pending Withdrawals'
  };

  const ensureUserStat = async () => {
    if (!totalUsers?.statuses && !loading) {
      await dashboardService.fetchUserStat(dispatch);
    }
  };

  const loadUserBalance = async () => {
    await dashboardService.fetchUserBalance(dispatch);
  };
  const loadPouchBalance = async () => {
    await dashboardService.fetchPouchBalance(dispatch);
  };

  useEffect(() => {
    ensureUserStat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lazy load balances when tab switches
  useEffect(() => {
    if (activeTab === 'userBalance' && !userBalance && !userBalanceLoading) {
      loadUserBalance();
    }
    if (activeTab === 'pouchBalance' && pouchBalance.length === 0 && !pouchBalanceLoading) {
      loadPouchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const onRefreshUserStat = () => ensureUserStat();
  const onRefreshUserBalance = () => loadUserBalance();
  const onRefreshPouchBalance = () => loadPouchBalance();

  return (
    <div className='space-y-4'>
      <Tabs>
        <TabsList>
          <TabTrigger isActive={activeTab==='dashboard'} onClick={() => setActiveTab('dashboard')}>Dashboard</TabTrigger>
          <TabTrigger isActive={activeTab==='userBalance'} onClick={() => setActiveTab('userBalance')}>User Balance</TabTrigger>
          <TabTrigger isActive={activeTab==='pouchBalance'} onClick={() => setActiveTab('pouchBalance')}>Pouch Balance</TabTrigger>
        </TabsList>
      </Tabs>

      {activeTab === 'dashboard' && (
        <div>
          {loading && <Spinner />}
          {error && <ErrorLayout errMsg={error} handleRefresh={onRefreshUserStat} />}
          {!loading && !error && (
            <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-x-scroll scrollbar-none'>
              <Card
                icon={<Loader size='22px' />}
                amount={formatAmount(totalUsers?.statuses?.active?.current)}
                name='Active Users'
                rate={totalUsers?.statuses?.active ? Number(totalUsers.statuses.active.change).toFixed(2) : '0.00'}
                color='text-green-600'
              />
              <Card
                icon={<Loader size='22px' />}
                amount={formatAmount(totalUsers?.statuses?.inactive?.current)}
                name='Inactive Users'
                rate={totalUsers?.statuses?.inactive ? Number(totalUsers.statuses.inactive.change).toFixed(2) : '0.00'}
                color='text-gray-600'
              />
              <Card
                icon={<Loader size='22px' />}
                amount={formatAmount(totalUsers?.statuses?.blocked?.current)}
                name='Blocked Users'
                rate={totalUsers?.statuses?.blocked ? Number(totalUsers.statuses.blocked.change).toFixed(2) : '0.00'}
                color='text-black'
              />
              <Card
                icon={<Loader size='22px' />}
                amount={formatAmount(totalUsers?.statuses?.deleted?.current)}
                name='Deleted Users'
                rate={totalUsers?.statuses?.deleted ? Number(totalUsers.statuses.deleted.change).toFixed(2) : '0.00'}
                color='text-danger'
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'userBalance' && (
        <div>
          {userBalanceLoading && <Spinner />}
          {userBalanceError && <ErrorLayout errMsg={userBalanceError} handleRefresh={onRefreshUserBalance} />}
          {!userBalanceLoading && !userBalanceError && userBalance?.totals && (
            <div className='space-y-3'>
              <div className='flex justify-end'>
                <select
                  value={userBalanceMetric}
                  onChange={(e) => setUserBalanceMetric(e.target.value)}
                  className='text-xs border border-gray-300 rounded-sm px-2 py-1 bg-white dark:bg-transparent dark:text-white'
                >
                  {balanceMetricOptions.map(opt => (
                    <option key={opt} value={opt}>{balanceMetricLabels[opt]}</option>
                  ))}
                </select>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-x-scroll scrollbar-none'>
                {userBalance.totals.map(item => {
                  const metricValue = item[userBalanceMetric] ?? 0;
                  return (
                    <Card
                      key={item.currency}
                      icon={<Loader size='22px' />}
                      amount={`${formatAmount(Number(metricValue).toFixed(2))} ${item.currency}`}
                      name={balanceMetricLabels[userBalanceMetric]}
                      rate={null}
                      color='text-primary-dark'
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'pouchBalance' && (
        <div>
          {pouchBalanceLoading && <Spinner />}
          {pouchBalanceError && <ErrorLayout errMsg={pouchBalanceError} handleRefresh={onRefreshPouchBalance} />}
          {!pouchBalanceLoading && !pouchBalanceError && pouchBalance.length > 0 && (
            <div className='space-y-3'>
              <div className='flex justify-end'>
                <select
                  value={pouchBalanceMetric}
                  onChange={(e) => setPouchBalanceMetric(e.target.value)}
                  className='text-xs border border-gray-300 rounded-sm px-2 py-1 bg-white dark:bg-transparent dark:text-white'
                >
                  {pouchMetricOptions.map(opt => (
                    <option key={opt} value={opt}>{pouchMetricLabels[opt]}</option>
                  ))}
                </select>
              </div>
              <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-3 overflow-x-scroll scrollbar-none'>
                {pouchBalance.map(wallet => {
                  const rawValue = wallet[pouchBalanceMetric] ?? 0;
                  const numericValue = typeof rawValue === 'string' ? Number(rawValue) : rawValue;
                  return (
                    <Card
                      key={wallet.id}
                      icon={<Loader size='22px' />}
                      amount={`${formatAmount(Number(numericValue).toFixed(2))} ${wallet.currency}`}
                      name={pouchMetricLabels[pouchBalanceMetric]}
                      rate={null}
                      color='text-primary-dark'
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SummaryCardsTabs;