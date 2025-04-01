import { Loader } from 'lucide-react';
import React from 'react';

const Spinner = () => {
    return (
        <div className="h-[350px] w-full flex items-center justify-center bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                {/* <div className="w-12 h-12 border-4 border-t-4 border-[#272662] rounded-full animate-spin"></div> */}
                <Loader size='35px' className='text-black/75 dark:text-white/80' />
                <p className="mt-4 text-black/75 dark:text-white/80 text-lg">Loading...</p>
            </div>
        </div>
    );
};

export default Spinner;
