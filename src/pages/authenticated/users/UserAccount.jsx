import { useEffect } from "react";
import Card from "../../../components/ui/card";
import RecentActivity from "../../../components/ui/recent-activity";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";
import ContentDisplayLayout from "../../../components/ui/content-display-layout";
import { Landmark } from "lucide-react";
import { formatAmount } from "../../../utils/amountFormmerter";

const UserAccount = ({id}) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userService = new UserService(axiosPrivate);
  const {loading, banksLoading, error, userAccount, userBanks, userActivity} = useSelector((state) => state.user);

  const banks = Array.isArray(userBanks) ? userBanks : [];
  
  const loadUserAccount = async () => {
    await userService.fetchUserAccount(id, dispatch);
  }
  
  const loadUserActivities = async () => {
    await userService.fetchUserActivities(id, dispatch);
  }
  
  const loadUserBanks = async () => {
    await userService.fetchBankDetail(id, dispatch);
  }
    
  useEffect(() => {
    loadUserAccount();
    loadUserActivities();
    loadUserBanks();
  }, [id, dispatch]);
    
  const onRefresh = () => {
    loadUserAccount();
    loadUserActivities();
  };
    
  const onRefreshBankList = () => {
    loadUserBanks();
  };

  const cardColors = ['bg-[#E2BBE9]/24', 'bg-[#F1F8FF]', 'bg-[#D0CDE1]/30'];

  if (loading) return <Spinner />

  if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="">
      <div className="flex gap-3 overflow-x-scroll scrollbar-none">
        {userAccount && userAccount.map((card, index) => (
          <div key={card.id} className="w-full">
            <Card
              icon={card.currency}
              iconClassName='w-4 md:w-8 h-4 md:h-8 text-[7px] md:text-[9px] font-[700] rounded-full flex items-center justify-center bg-[#D0CDE1]/30'
              className='w-full'
              amount={formatAmount(card.balance)}
              name='Total Balance'
              rate=''
              color={cardColors[index]}
            />
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-5 gap-10 mt-10">
        <div className="col-span-3">
            <RecentActivity 
                data={userActivity}
                loading={loading}
                error={error}
                onRefresh={loadUserActivities}
            />
        </div>
        <div className="col-span-2">
          <ContentDisplayLayout
            title='Bank Details'
            loading={banksLoading}
            onRefresh={onRefreshBankList}
            value={
              banks.length > 0 ? (banks.map((data) => (
                <div key={data.id} className="bg-white text-primary text-xs px-2 py-2 flex items-center gap-5">
                  <Landmark size='17px' />
                  <div className="">
                    <p className="font-[600] mb-1">{data.accountName}</p>
                    <p className="font-[500]">{data.accountNumber}</p>
                  </div>
                </div>
              ))) : (
                <div>No bank account available</div>
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;