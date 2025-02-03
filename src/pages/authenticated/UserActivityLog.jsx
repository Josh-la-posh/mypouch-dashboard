import { Vault } from 'lucide-react'
import React from 'react'

function UserActivityLog() {
  return (
    <div className='mt-8 px-25 dark:text-white space-y-4'>
        <div className="flex justify-between">
            <div className="flex items-center gap-7">
                <Vault size='18px' className='text-primary' />
                <p className='font-[500]'>Last Login</p>
            </div>
            <p className='font-[600]'>June 5, 10:00 AM</p>
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-7">
                <Vault size='18px' className='text-primary' />
                <p className='font-[500]'>Last Login</p>
            </div>
            <p className='font-[600]'>June 5, 10:00 AM</p>
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-7">
                <Vault size='18px' className='text-primary' />
                <p className='font-[500]'>Last Login</p>
            </div>
            <p className='font-[600]'>June 5, 10:00 AM</p>
        </div>
        <div className="flex justify-between">
            <div className="flex items-center gap-7">
                <Vault size='18px' className='text-primary' />
                <p className='font-[500]'>Last Login</p>
            </div>
            <p className='font-[600]'>June 5, 10:00 AM</p>
        </div>
    </div>
  )
}

export default UserActivityLog