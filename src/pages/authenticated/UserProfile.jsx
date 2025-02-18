import React, { useEffect, useState } from "react";
import InputField from "../../components/ui/input";
import Button from "../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../services/hooks/useAxiosPrivate";
import UserService from "../../services/api/userApi";
import ErrorLayout from "../../components/ui/error_page";

const UserProfile = ({id}) => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const userService = new UserService(axiosPrivate);
    const {loading, updateLoading, error, userDetail} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: userDetail?.email ?? '',
        country: userDetail?.country ?? '',
        address: userDetail?.address ?? '',
        state: userDetail?.state ?? '',
    });

    const loadUserDetails = async () => {
      await userService.fetchUserDetail(id, dispatch);
    }
      
    useEffect(() => {
        loadUserDetails();
    }, [id, dispatch]);

      useEffect(() => {
        setFormData({
            email: userDetail.email,
            country: userDetail.country,
            state: userDetail.state,
            address: userDetail.address
        });
      }, [userDetail]);
    
      const onRefresh = () => {
        loadUserDetails();
      };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await userService.updateUserDetail(id, formData, dispatch);
    }

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

  return (
    <div className="space-y-6 ml-20 max-w-[450px]">
        <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
                label='Email Address'
                type="email"
                placeholder='my@pouch.com'
                id='email'
                value={loading ? '' : formData.email}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='Country'
                placeholder='Nigeria'
                id='country'
                value={loading ? '' : formData.country}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='State'
                placeholder='Lagos'
                id='state'
                value={loading ? '' : formData.state}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='Home Address'
                placeholder='20, My Pouch close'
                id='address'
                value={loading ? '' : formData.address}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />

            <div className="max-w-[170px] mt-10">
                <Button
                    variant="secondary"
                    className='text-xs font-light'
                    disabled={updateLoading}
                >
                    {updateLoading ? 'Updating' : 'Update'}
                </Button>
            </div>
        </form>
    </div>
  );
};

export default UserProfile;