import { useEffect, useState } from "react";
import InputField from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import CustomModal from "../../../components/ui/custom-modal";

const UserProfile = ({id}) => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const userService = new UserService(axiosPrivate);
    const {loading, updateLoading, error, userDetail, isPerformingAction} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: userDetail?.email === null ? '' : userDetail?.email ?? '',
        country: userDetail?.country === null ? '' : userDetail?.country ?? '',
        address: userDetail?.address === null ? '' : userDetail?.address ?? '',
        state: userDetail?.state === null ? '' : userDetail?.state ?? '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadUserDetails = async () => {
      await userService.fetchUserDetail(id, dispatch);
    }

    const blockUser = async () => {
      await userService.blockUser(id, dispatch);
    }

    const unblockUser = async () => {
      await userService.unblockUser(id, dispatch);
    }

    const onClose = () => setIsModalOpen(false);
      
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

    const handleAction = async () => {
        setIsModalOpen(!isModalOpen);
        if (userDetail.status === 'active') {
            await blockUser(id, dispatch);
        } else {            
            await unblockUser(id, dispatch);
        }
    }

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

    return (
    <div className="space-y-6 px-10">
        <div className="flex justify-end">
            <div className="w-24">
                <Button
                    variant={userDetail.status === 'active' ? "danger" : "primary"}
                    onClick={() => setIsModalOpen(true)}
                    disabled={isPerformingAction}
                >
                    {userDetail.status === 'active' ? `${isPerformingAction ? "Blocking" : "Block"}` : `${isPerformingAction ? "Unblocking" : "Unblock"}`}
                </Button>
            </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-[450px]">
            <InputField
                label='Email Address'
                type="email"
                placeholder='my@pouch.com'
                id='email'
                value={loading ? '' : formData.email}
                onChange={handleChange}
            />
            <InputField
                label='Country'
                placeholder='Nigeria'
                id='country'
                value={loading ? '' : formData.country}
                onChange={handleChange}
            />
            <InputField
                label='State'
                placeholder='Lagos'
                id='state'
                value={loading ? '' : formData.state}
                onChange={handleChange}
            />
            <InputField
                label='Home Address'
                placeholder='20, My Pouch close'
                id='address'
                value={loading ? '' : formData.address}
                onChange={handleChange}
            />

            <div className="max-w-[170px] mt-10">
                <Button
                    variant="primary"
                    className='text-xs'
                    disabled={updateLoading}
                >
                    {updateLoading ? 'Updating' : 'Update'}
                </Button>
            </div>
        </form>
        <CustomModal
            title={`Are you sure you want to ${userDetail.status === 'active' ? "block" : "unblock"} this user?`}
            isOpen={isModalOpen}
            onClose={onClose}
        >
            <div className="flex justify-center gap-10">
                <Button
                    variant="primary"
                    onClick={handleAction}
                >
                    Confirm
                </Button>
                <Button
                    variant="danger"
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>

        </CustomModal>
    </div>
    );
};

export default UserProfile;