import {useEffect, useState} from 'react'
import InputField from '../../../../components/ui/input'
import Button from '../../../../components/ui/button';
import useSettingsTitle from '../../../../services/hooks/useSettitngsTitle';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosPrivate from '../../../../services/hooks/useAxiosPrivate';
import SettingService from '../../../../services/api/settingsApi';
import { toast } from 'react-toastify';
import useTitle from '../../../../services/hooks/useTitle';

function ChangePassword() {
  const {setAppTitle} = useTitle();
  const { setSettingsTitle } = useSettingsTitle();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const {isChangingPassword} = useSelector((state) => state.setting);
  const settingService = new SettingService(axiosPrivate);
  const [pss, setPss] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: ''
  });
    
  useEffect(() => {
    setAppTitle('Settings');
  }, [setAppTitle]);
    
  useEffect(() => {
    setSettingsTitle('Security Settings');
  }, [setSettingsTitle]);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pss !== formData.newPassword) return toast.error('Password do no match');
    await settingService.changePassword(formData, dispatch);
    setFormData({ currentPassword: "", newPassword: ""});
    setPss('');
  }

  return (
    <div className='pl-10 w-full max-w-[400px] space-y-6'>
      <p className='text-black/75 dark:text-white/80 text-xl font-[600] '>Change Password</p>
      <div className="">
        <form onSubmit={handleSubmit} className='space-y-6'>
          <InputField
            type='password'
            label='Current Password'
            id='currentPassword'
            placeholder='Enter current password'
            value={formData.currentPassword}
            onChange={handleChange}
            showToggle
          />
          <InputField
            type='password'
            label='New Password'
            id='newPassword'
            placeholder='Enter new password'
            value={formData.newPassword}
            onChange={handleChange}
            showToggle
            showStrength
          />
          <InputField
            type='password'
            label='Confirm Password'
            id='pss'
            placeholder='Re-enter new password'
            value={pss}
            onChange={(e) => setPss(e.target.value)}
            showToggle
          />
          <div className="flex gap-8">
            <Button
              variant='primary'
              disabled={isChangingPassword}
            >
              {isChangingPassword ? 'Updating' : 'Update'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword;