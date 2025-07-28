import React from 'react'

function Admindashboard() {
  return (
    <div className='py-10 w-[90vw]'>
      <div className='text-3xl logo text-center'>DASHBOARD</div>
      <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center mt-10 items-center gap-10'>
        <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
          <div className='text-xl font-bold text-center'>TOTAL USERS</div>
          <div className='text-green-300 text-2xl font-bold text-center'>1</div>
        </div>
        <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
          <div className='text-xl font-bold text-center'>TOTAL COMPANIES</div>
          <div className='text-green-300 text-2xl font-bold text-center'>1</div>
        </div>
        <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
          <div className='text-xl font-bold text-center'>TOTAL JOBS</div>
          <div className='text-green-300 text-2xl font-bold text-center'>1</div>
        </div>
        <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
          <div className='text-xl font-bold text-center'>ACTIVE JOBS</div>
          <div className='text-green-300 text-2xl font-bold text-center'>1</div>
        </div>
        <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
          <div className='text-xl font-bold text-center'>BLOCKLIST</div>
          <div className='text-green-300 text-2xl font-bold text-center'>1</div>
        </div>
        <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
          <div className='text-xl font-bold text-center'>INACTIVE JOBS</div>
          <div className='text-green-300 text-2xl font-bold text-center'>1</div>
        </div>
      </div>
    </div>
  )
}

export default Admindashboard
