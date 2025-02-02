import React from "react";
import Card from "../../components/ui/card";
import { Loader, RefreshCcw, TrendingUp } from "lucide-react";
import TextButton from "../../components/ui/textButton";
import RecentActivity from "../../components/ui/recent-activity";

const Dashboard = () => {
  const cardStat = [
    {
      id: 1,
      amount: '12,500',
      name: 'Active',
      rate: '12.5',
      color: 'bg-[#0FEB90]'
    },
    {
      id: 2,
      amount: '30',
      name: 'Inactive',
      rate: '1.25',
      color: 'bg-[#D0CDE1]/30'
    },
    {
      id: 3,
      amount: '10',
      name: 'Block',
      rate: '10',
      color: 'bg-[#CABEC7]'
    },
  ];

  const currencyStat = [
    {
      id: 1,
      currency: 'USD',
      rate: '40.3'
    },
    {
      id: 2,
      currency: 'GBP',
      rate: '30.3'
    },
    {
      id: 3,
      currency: 'NGN',
      rate: '20.3'
    },
    {
      id: 4,
      currency: 'EUR',
      rate: '5.3'
    },
    {
      id: 5,
      currency: 'CAD',
      rate: '0.93'
    },
  ];

  const onRefresh = () => {
  };

  return (
    <div className="">
      <h1 className="text-md font-[500] dark:text-white">Welcom back Morgan</h1>
      <div className="mt-10 grid grid-cols-5">
        <div className=" col-span-3">
          <div className="flex gap-3">
            {cardStat.map((card) => (
              <div key={card.id} className="flex-1">
                <Card
                  icon={<Loader size='22px' />}
                  amount={card.amount}
                  name={card.name}
                  rate={card.rate}
                  color={card.color}
                />
              </div>
            ))}
          </div>
          <RecentActivity
            data={[1, 2, 3, 4]}
            onRefresh={onRefresh}
            className='mt-10'
          />
        </div>
        <div className="col-span-2">
          <div className="h-32"></div>
          <div className="">
            <p className="text-xs font-[600] text-center">The Most Traded Currency</p>
            <div className="mt-4 space-y-2 flex flex-col items-center">
              {
                currencyStat.map((cur) => (
                  <div key={cur.id} className="flex items-center justify-between text-xs bg-black dark:bg-white px-3 py-1 rounded-sm w-[80%]">
                    <p className="text-danger">{cur.currency}</p>
                    <div className={`flex items-center gap-4 ${cur.rate < 1 ? 'text-danger' :'text-color-green'}`}>
                      <div className=""><TrendingUp size='15px' /></div>
                      <p>{cur.rate}%</p>
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