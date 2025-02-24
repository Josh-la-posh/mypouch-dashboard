import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/card";
import { Loader, TrendingUp } from "lucide-react";
import RecentActivity from "../../../components/ui/recent-activity";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import DashboardService from "../../../services/api/dashboardApi";
import Spinner from "../../../components/ui/spinner";
import ErrorLayout from "../../../components/ui/error_page";
import useAuth from "../../../services/hooks/useAuth";

const Dashboard = () => {
  const {auth} = useAuth();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {loading, adminActivitiesLoading, error, adminActivitiesError, adminActivities, totalUsers, transactionStat} = useSelector((state) => state.dashboard);
  const dashboardService = new DashboardService(axiosPrivate);
  const [data, setData] = useState(totalUsers);
  const [transactions, setTransactions] = useState(transactionStat);

  const loadUsesrStat = async () => {
    await dashboardService.fetchUserStat(dispatch);
  }

  const loadTransactionStat = async () => {
    await dashboardService.fetchTransactionStat(dispatch);
  }

  const loadAdminActivities = async () => {
    await dashboardService.fetchAdminActivities(dispatch);
  }

  useEffect(() => {
    loadUsesrStat();
  }, [dispatch]);

  useEffect(() => {
    setData(totalUsers);
  }, [totalUsers]);

  useEffect(() => {
    setTransactions(transactionStat);
  }, [transactionStat]);

  const onRefresh = () => {
    loadUsesrStat();
  };

  const refreshAdminActivities = () => {
    loadAdminActivities();
  }

  if (loading) return <Spinner />

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="">
      <h1 className="text-md font-[500] dark:text-[#C2A6DD]">Welcom back {auth?.data?.firstName}</h1>
      <div className="mt-10 grid grid-cols-5">
        <div className=" col-span-3">
          <div className="flex justify-between gap-3">
            <Card
              icon={<Loader size='22px' />}
              amount={data?.statuses?.active?.current}
              name="Active Users"
              rate={Number(data?.statuses?.active?.change).toFixed(2)}
              color="bg-[#0FEB90]"
            />
            <Card
              icon={<Loader size='22px' />}
              amount={data?.statuses?.inactive?.current}
              name="Inactive Users"
              rate={Number(data?.statuses?.inactive?.change).toFixed(2)}
              color="bg-[#D0CDE1]/30"
            />
            <Card
              icon={<Loader size='22px' />}
              amount={data?.statuses?.blocked?.current}
              name="Blocked Users"
              rate={Number(data?.statuses?.blocked?.change).toFixed(2)}
              color="bg-[#CABEC7]"
            />
            <Card
              icon={<Loader size='22px' />}
              amount={data?.statuses?.blocked?.current}
              name="Deleted Users"
              rate={Number(data?.statuses?.deleted?.change).toFixed(2)}
              color="bg-[#CABEC7]"
            />
          </div>
          <RecentActivity
            data={adminActivities}
            onRefresh={refreshAdminActivities}
            loading={adminActivitiesLoading}
            error={adminActivitiesError}
            className='mt-10'
          />
        </div>
        <div className="col-span-2">
          <div className="h-32"></div>
          <div className="">
            <p className="text-xs font-[600] text-center dark:text-[#C2A6DD]">The Most Traded Currency</p>
            <div className="mt-4 space-y-2 flex flex-col items-center">
              {
                transactions.map((cur) => (
                  <div key={cur.currency} className="flex items-center justify-between text-xs bg-[#121212] dark:bg-white px-3 py-1 rounded-sm w-[80%]">
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
    </div>
  );
};

export default Dashboard;