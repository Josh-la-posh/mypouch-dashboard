import React from 'react'

function ErrorLayout({errMsg, handleRefresh}) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-100/70 dark:bg-slate-900/40 z-50 rounded-xl p-4">
        <div className="flex flex-col items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-8">
            <p className="mt-2 text-slate-800 dark:text-slate-100 text-lg md:text-xl font-[700] text-center">{errMsg}</p>
            <button
                className='bg-primary hover:bg-primary-dark rounded-lg text-white px-8 py-3 mt-6 text-sm md:text-base font-semibold transition-colors'
                onClick={handleRefresh}
            >
                Retry
            </button>
        </div>
    </div>
  )
}

export default ErrorLayout
