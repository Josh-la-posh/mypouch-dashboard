import React, { useEffect } from "react";
import Card from "../../../components/ui/card";
import RecentActivity from "../../../components/ui/recent-activity";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";

const UserAccount = ({id}) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userService = new UserService(axiosPrivate);
  const {loading, error, userAccount, userActivity} = useSelector((state) => state.user);
  
  const loadUserAccount = async () => {
    await userService.fetchUserAccount(id, dispatch);
  }
  
  const loadUserActivities = async () => {
    await userService.fetchUserActivities(id, dispatch);
  }
    
  useEffect(() => {
      loadUserAccount();
      loadUserActivities();
  }, [id, dispatch]);
    
  const onRefresh = () => {
    loadUserDetails();
    loadUserActivities();
  };

  const cardColors = ['bg-[#E2BBE9]/24', 'bg-[#F1F8FF]', 'bg-[#D0CDE1]/30'];

  if (loading) return <Spinner />

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="">
      <div className="flex gap-3">
          {userAccount && userAccount.map((card, index) => (
              <div key={card.id} className="flex-1">
              <Card
                  icon={card.currency}
                  iconClassName='w-8 h-8 text-xs font-[700] rounded-full flex items-center justify-center bg-[#D0CDE1]/30'
                  amount={card.balance}
                  name='Total Balance'
                  rate=''
                  color={cardColors[index]}
              />
              </div>
          ))}
      </div>
      <div className="grid grid-cols-5">
          <div className=" col-span-3">
              <RecentActivity 
                  data={userActivity}
                  loading={loading}
                  error={error}
                  onRefresh={loadUserActivities}
                  className='mt-10'
              />
          </div>
          <div className="col-span-2">
              <div className="h-32"></div>
          </div>
      </div>
    </div>
  );
};

export default UserAccount;