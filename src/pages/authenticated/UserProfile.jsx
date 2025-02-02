import React, { useState } from "react";
import InputField from "../../components/ui/input";
import Button from "../../components/ui/button";

const UserProfile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        homeAddress: '',
        mobileNumber: '',
        country: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

  return (
    <div className="space-y-6 ml-20 max-w-[450px]">
        <form onSubmit={handleSubmit}>
            <InputField
                label='Full Name'
                placeholder='Bankole Sunday Isaac'
                id='fullName'
                value={formData.fullName}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='Email Address'
                type="email"
                placeholder='my@pouch.com'
                id='email'
                value={formData.email}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='Home Address'
                placeholder='20, My Pouch close'
                id='homeAddress'
                value={formData.homeAddress}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='Mobile Number'
                type="tel"
                placeholder='080********'
                id='mobileNumber'
                value={formData.mobileNumber}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />
            <InputField
                label='Country'
                placeholder='Nigeria'
                id='country'
                value={formData.country}
                onChange={handleChange}
                labelClassName='text-xs'
                inputClassName='text-sm'
            />

            <div className="max-w-[170px] mt-10">
                <Button
                    variant="secondary"
                    className='text-xs font-light'
                >
                    Update
                </Button>
            </div>
        </form>
    </div>
  );
};

export default UserProfile;