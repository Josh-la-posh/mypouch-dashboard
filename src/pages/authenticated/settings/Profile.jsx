import React, { useEffect, useState } from "react";
import InputField from "../../../components/ui/input";
import useTitle from "../../../services/hooks/useTitle";
import Button from "../../../components/ui/button";
import useSettingsTitle from "../../../services/hooks/useSettitngsTitle";
import useAuth from "../../../services/hooks/useAuth";
import SelectField from "../../../components/ui/select";
import { GENDER } from "../../../data/gender";
import SettingService from '../../../services/api/settingsApi';
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../services/hooks/useAxiosPrivate";
import TextButton from "../../../components/ui/textButton";
import { Edit3Icon } from "lucide-react";

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const { setAppTitle } = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { isUpdating } = useSelector((state) => state.setting);
  const settingService = new SettingService(axiosPrivate);
  const [canUpdate, setCanUpdate] = useState(false);
  const [formData, setFormData] = useState({
    firstName: auth?.data?.firstName,
    lastName: auth?.data?.lastName,
    email: auth?.data?.email,
    phoneNumber: auth?.data?.phoneNumber,
    address: auth?.data?.address,
    state: auth?.data?.state,
    gender: auth?.data?.gender,
    profilePicture: auth?.data?.profilePicture,
    role: auth?.data?.role?.name
  });
  const [submittingData, setSubmittingData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmittingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
    setSubmittingData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await settingService.updateAdminDetails({'profilePicture': reader.result}, setAuth, dispatch);
        setFormData((prev) => ({
          ...prev,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }    
  };

  useEffect(() => {
    setAppTitle("Settings");
  }, []);

  useEffect(() => {
    setSettingsTitle("Profile");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await settingService.updateAdminDetails(submittingData, setAuth, dispatch);
    setCanUpdate(false);
    setFormData({ ...formData, ...submittingData });
    setSubmittingData({});
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-end">
          <div className="w-16 h-16 bg-primary dark:bg-white text-white dark:text-primary rounded-full flex items-center justify-center">
            {formData.profilePicture ? (
              <img src={formData.profilePicture} alt={`${formData.firstName} ${formData.lastName} Profile`} />
            ) : (
              `${formData.firstName[0]}${formData.lastName[0]}`
            )}
          </div>
          <input
            type="file"
            id="profileImageUpload"
            style={{ display: 'none' }}
            onChange={handleImageChange}
            accept="image/*"
          />
          <TextButton onClick={() => document.getElementById("profileImageUpload").click()}>
            <Edit3Icon size="16px" />
          </TextButton>
        </div>
        {!canUpdate && (
          <div className="w-24">
            <Button
              variant="primary"
              onClick={() => setCanUpdate(true)}
              className="text-xs"
            >
              Update
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <InputField
          label="First Name"
          type="text"
          id="firstName"
          value={formData.firstName}
          disabled
          onChange={handleChange}
        />
        <InputField
          label="Last Name"
          type="text"
          id="lastName"
          value={formData.lastName}
          disabled
          onChange={handleChange}
        />
        <InputField
          label="Email"
          type="email"
          id="email"
          value={formData.email}
          disabled
          onChange={handleChange}
        />
        <InputField
          label="Phone Number"
          type="tel"
          id="phoneNumber"
          value={formData.phoneNumber}
          disabled={!canUpdate}
          onChange={handleChange}
        />
        <InputField
          label="Address"
          type="text"
          id="address"
          value={formData.address}
          disabled={!canUpdate}
          onChange={handleChange}
        />
        <InputField
          label="State"
          type="text"
          id="state"
          value={formData.state}
          disabled={!canUpdate}
          onChange={handleChange}
        />
        <SelectField
          label="Gender"
          id="gender"
          options={GENDER}
          value={formData.gender}
          onChange={handleGenderChange}
        />
        <InputField
          label="Role"
          type="text"
          id="role"
          value={formData.role}
          disabled={true}
          onChange={handleChange}
        />
      </div>
      {canUpdate && (
        <div className="flex justify-end">
          <div className="w-48">
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating ...' : 'Save'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
