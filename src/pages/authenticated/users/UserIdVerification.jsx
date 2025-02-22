import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import Spinner from "../../../components/ui/spinner";

const UserIdVerification = ({id}) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const userService = new UserService(axiosPrivate);
  const {loading, error, userVerification} = useSelector((state) => state.user);
  
  const loadUserVerifiaction = async () => {
    await userService.fetchUserVerification(id, dispatch);
  }
    
  useEffect(() => {
    loadUserVerifiaction();
  }, [id, dispatch]);
    
  const onRefresh = () => {
    loadUserVerifiaction();
  };

  // if (loading) return <Spinner />

  // if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="pt-10">
      <div className="flex flex-col items-center justify-center text-primary space-y-6">
        <p className="text-2xl font-[600]">ID Verification</p>
        <div className="w-36 h-36"><img src="/checkIcon.svg" /></div>
        <p className="text-2xl">KYC Verification Successful</p>
        <div className="border border-gray-300 dark:border-primary shadow-lg px-6 py-2 text-2xl font-[500]">Bankole Isaac Sunday</div>
        <div className="border border-gray-300 dark:border-primary shadow-lg px-4 py-2 text-xs">Mode of verification (Driver's Licence)</div>
        <div className="border border-gray-300 dark:border-primary shadow-md px-4 py-2">Location (Nigeria)</div>
      </div>
    </div>
  );
};

export default UserIdVerification;