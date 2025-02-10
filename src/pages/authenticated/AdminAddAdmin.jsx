import React, {useEffect, useState} from 'react'
import InputField from '../../components/ui/input'
import Button from '../../components/ui/button';
import useSettingsTitle from '../../services/hooks/useSettitngsTitle';

function AdminAddAdmin() {
  const { setSettingsTitle } = useSettingsTitle();
  const [formData, setFormData] = useState({
    adminRole: '',
    email: '',
    adminSecret: ''
  });
    
  useEffect(() => {
    setSettingsTitle('Add Admin');
  }, []);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-primary text-lg font-[600] text-center'>Super Admin Form</p>
      <div className="">
        <form>
          <InputField
            label='Email'
            textColor='text-primary'
            type='email'
            id='email'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label='Admin Secret'
            textColor='text-primary'
            id='adminSecret'
            inputClassName='bg-primary/14 text-sm py-2'
            value={formData.adminSecret}
            onChange={handleChange}
          />
          <div className="flex gap-8 mt-10">
            <Button
              variant='primary'              
            >
              Submit
            </Button>
            <Button
              variant='danger'
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminAddAdmin;