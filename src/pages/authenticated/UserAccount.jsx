import React from "react";
import Card from "../../components/ui/card";
import RecentActivity from "../../components/ui/recent-activity";

const UserAccount = () => {
  const cardStat = [
    {
      id: 1,
      currency: 'USD',
      amount: '500',
      name: 'Total',
      color: 'bg-[#E2BBE9]/24'
    },
    {
      id: 2,
      currency: 'NGN',
      amount: '500',
      name: 'Total',
      color: 'bg-[#F1F8FF]'
    },
    {
      id: 3,
      currency: 'CAD',
      amount: '500',
      name: 'Total',
      color: 'bg-[#D0CDE1]/30'
    },
  ];

  const onRefresh = () => {
  }

  return (
    <div className="grid grid-cols-5">
        <div className=" col-span-3">
            <div className="flex gap-3">
                {cardStat.map((card) => (
                    <div key={card.id} className="flex-1">
                    <Card
                        icon={card.currency}
                        iconClassName='w-8 h-8 text-xs font-[700] rounded-full flex items-center justify-center bg-[#D0CDE1]/30'
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
        </div>
    </div>
  );
};

export default UserAccount;