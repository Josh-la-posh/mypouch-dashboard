import { useEffect, useState } from "react";
import InputField from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import UserService from "../../../services/api/userApi";
import ErrorLayout from "../../../components/ui/error_page";
import CustomModal from "../../../components/ui/custom-modal";

// eslint-disable-next-line react/prop-types
const UserProfile = ({id}) => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const userService = new UserService(axiosPrivate);
    const {loading, updateLoading, error, userDetail, isPerformingAction} = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        email: userDetail?.email === null ? '' : userDetail?.email ?? '',
        name: `${userDetail?.firstName ?? ''} ${userDetail?.lastName ?? ''}`.trim(),
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName,
        country: userDetail?.country === null ? '' : userDetail?.country ?? '',
        address: userDetail?.address === null ? '' : userDetail?.address ?? '',
        state: userDetail?.state === null ? '' : userDetail?.state ?? '',
        postCode: userDetail?.postCode === null ? '' : userDetail?.postCode ?? '',
        phoneNumber: userDetail?.phoneNumber === null ? '' : userDetail?.phoneNumber ?? '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false); // confirmation modal
    const [showPrivacy, setShowPrivacy] = useState(false); // toggle between profile form and privacy panel
    const [pendingAction, setPendingAction] = useState(null); // 'block' | 'unblock' | 'delete'

    const loadUserDetails = async () => {
      await userService.fetchUserDetail(id, dispatch);
    }

        const blockUser = async () => {
            await userService.blockUser(id, dispatch);
        };

        const unblockUser = async () => {
            await userService.unblockUser(id, dispatch);
        };

        const deleteUser = async () => {
            await userService.deleteUser(id, dispatch);
        };

    const onClose = () => setIsModalOpen(false);
      
    useEffect(() => {
        loadUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch]);

    useEffect(() => {
    if (!userDetail) return;

    setFormData({
        email: userDetail.email,
        name: `${userDetail?.firstName ?? ''} ${userDetail?.lastName ?? ''}`.trim(),
        country: userDetail.country,
        state: userDetail.state,
        address: userDetail.address,
        postCode: userDetail.postCode,
        phoneNumber: userDetail.phoneNumber,
        firstName: userDetail?.firstName,
        lastName: userDetail?.lastName
    });
    }, [userDetail]);

    const onRefresh = () => {
    loadUserDetails();
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'name') {
            const cleaned = value.trim().replace(/\s+/g, ' ');
            const [firstName = '', ...rest] = cleaned ? cleaned.split(' ') : [];
            const lastName = rest.join(' ');

            setFormData((prev) => ({
                ...prev,
                name: value,
                firstName,
                lastName
            }));
            return;
        }

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData)
        await userService.updateUserDetail(id, formData, dispatch);
    }

        const openPrivacy = () => setShowPrivacy(true);
        const closePrivacy = () => setShowPrivacy(false);

        const openConfirm = (action) => {
            setPendingAction(action);
            setIsModalOpen(true);
        };

        const handleConfirmAction = async () => {
            if (!pendingAction) return;
            if (pendingAction === 'block') await blockUser();
            else if (pendingAction === 'unblock') await unblockUser();
            else if (pendingAction === 'delete') await deleteUser();
            setIsModalOpen(false);
            setPendingAction(null);
        };

    if (error) return <ErrorLayout errMsg={error} handleRefresh={onRefresh} />

        return (
            <div className="space-y-6 px-10">
                {!showPrivacy && (
                    <div className="flex justify-end">
                        <div className="w-fit">
                            <Button
                                variant="secondary"
                                className="text-xs"
                                onClick={openPrivacy}
                            >
                                Privacy settings
                            </Button>
                        </div>
                    </div>
                )}

                {!showPrivacy && (
                    <form onSubmit={handleSubmit} className="space-y-6 max-w-[450px] md:max-w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* <div className="flex flex-col gap-2">
                            <p className="text-sm font-[600] text-black/70 dark:text-white">Full Name</p>
                            <div className="w-full pr-10 text-xs lg:text-sm text-black/60 dark:text-white/70 bg-primary/14 border border-gray-300 rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-transparent focus:border-primary placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-700 placeholder:dark:text-white/40">
                                {userDetail?.firstName} {userDetail?.lastName}
                            </div>
                        </div> */}
                        <InputField
                            label='Full Name'
                            placeholder='My Pouch'
                            id='name'
                            value={loading ? '' : formData.name}
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
                            label='Email Address'
                            type="email"
                            placeholder='my@pouch.com'
                            id='email'
                            value={loading ? '' : formData.email}
                            onChange={handleChange}
                        />
                        <InputField
                            label='Postal Code'
                            type="text"
                            placeholder='123456'
                            id='postCode'
                            value={loading ? '' : formData.postCode}
                            onChange={handleChange}
                        />
                        <InputField
                            label='Phone Number'
                            placeholder='Lagos'
                            id='phoneNumber'
                            value={loading ? '' : formData.phoneNumber}
                            onChange={handleChange}
                        />
                        <InputField
                            label='Home Address'
                            placeholder='20, My Pouch close'
                            id='address'
                            value={loading ? '' : formData.address}
                            onChange={handleChange}
                        />
                        <div className="col-span-2 flex justify-center mt-14">
                            <div className="w-56">
                                <Button
                                    variant="primary"
                                    className='text-xs'
                                    disabled={updateLoading}
                                >
                                    {updateLoading ? 'Updating' : 'Update'}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}

                {showPrivacy && (
                    <div className="space-y-6">
                        <button onClick={closePrivacy} className="text-xs text-primary font-semibold flex items-center gap-1">
                            <span className="text-lg">←</span> Back
                        </button>
                        <div className="flex">
                            <div className="space-y-6 w-full md:w-1/2">
                                <div className='bg-color-green text-white dark:text-primary-dark rounded-sm px-6 py-4 text-xs font-bold min-w-[140px] text-center'>
                                    {userDetail?.status ? userDetail.status.charAt(0).toUpperCase() + userDetail.status.slice(1) : 'Unknown'}
                                </div>
                                <div className="space-y-2">
                                    <button
                                        disabled={isPerformingAction || userDetail?.status === 'active'}
                                        onClick={() => openConfirm('unblock')}
                                        className={`border w-full text-xs font-semibold px-4 py-3 rounded-sm text-left transition-colors ${userDetail?.status === 'active' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-primary-light/40'}`}
                                    >
                                        Activate Account
                                    </button>
                                    <button
                                        disabled={isPerformingAction || userDetail?.status === 'blocked'}
                                        onClick={() => openConfirm('block')}
                                        className={`border w-full text-xs font-semibold px-4 py-3 rounded-sm text-left transition-colors ${userDetail?.status === 'blocked' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-primary-light/40'}`}
                                    >
                                        Block Account
                                    </button>
                                    <button
                                        disabled={isPerformingAction || userDetail?.status === 'deleted'}
                                        onClick={() => openConfirm('delete')}
                                        className={`border w-full text-xs font-semibold px-4 py-3 rounded-sm text-left transition-colors ${userDetail?.status === 'deleted' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-primary-light/40'}`}
                                    >
                                        Deactivate Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <CustomModal
                    title={`Confirm ${pendingAction || ''} action`}
                    isOpen={isModalOpen}
                    onClose={onClose}
                >
                    <p className='text-xs mb-6'>Are you sure you want to {pendingAction} this user?</p>
                    <div className="flex justify-center gap-10">
                        <Button
                            variant="primary"
                            onClick={handleConfirmAction}
                            disabled={isPerformingAction}
                        >
                            {isPerformingAction ? 'Processing...' : 'Confirm'}
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
