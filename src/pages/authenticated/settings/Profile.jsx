import React, { useEffect, useState } from "react";
import InputField from "../../../components/ui/input";
import useTitle from "../../../services/hooks/useTitle";
import Button from "../../../components/ui/button";
import useSettingsTitle from "../../../services/hooks/useSettitngsTitle";

const Profile = () => {
  const {setAppTitle} = useTitle();
  const {setSettingsTitle} = useSettingsTitle();
  const [canUpdate, setCanUpdate] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    setAppTitle('Settings');
  }, []);

  useEffect(() => {
    setSettingsTitle('Profile');
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div className="w-16 h-16 bg-primary dark:bg-white text-white dark:text-primary rounded-full flex items-center justify-center">JP</div>
        {!canUpdate && <div className="w-24">
          <Button
            variant="primary"
            onClick={() => setCanUpdate(true)}
            className='text-xs'
          >
            Update
          </Button>
        </div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <InputField
          label='First Name'
          type='text'
          id='firstName'
          value={formData.firstName}
          disabled={!canUpdate}
          onChange={handleChange}
          required
        />
        <InputField
          label='Last Name'
          type='text'
          id='lastName'
          disabled={!canUpdate}
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <InputField
          label='Email'
          type='email'
          id='email'
          value={formData.email}
          disabled='true'
          onChange={handleChange}
          required
        />
        <InputField
          label='Phone Number'
          type='tel'
          id='phoneNumber'
          value={formData.phoneNumber}
          disabled='true'
          onChange={handleChange}
          required
        />
      </div>
      {canUpdate && <div className="flex justify-end">
        <div className="w-48">
          <Button
            variant="primary"
            onClick={() => setCanUpdate(false)}
          >
            Save
          </Button>
        </div>
      </div>}
    </div>
  );
};

export default Profile;