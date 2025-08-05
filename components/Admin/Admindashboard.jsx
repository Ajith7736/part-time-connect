import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import Loading from '../Company/Loading';


function Admindashboard() {
  const [totaldata, settotaldata] = useState(null)
  const [isloading, setisloading] = useState(false)

  const fetchtotal = async () => {
    setisloading(true)
    const res = await fetch(`${BASE_URL}/api/admin/getnumbers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json()
    if (res.status === 200) {
      settotaldata(data)
      setisloading(false)
    }
    if (res.status === 500) {
      toast.error(data.error)
      setisloading(false)
    }
  }

  useEffect(() => {
    fetchtotal();
  }, [])


  return (
    <>
      {isloading && <div className='fixed w-full'>
        <Loading />
      </div>}

      <div className='py-10 w-[85vw]'>
        <div className='text-3xl logo text-center'>DASHBOARD</div>
        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center mt-10 items-center gap-10'>
          <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
            <div className='text-xl font-bold text-center'>TOTAL USERS</div>
            <div className='text-green-300 text-2xl font-bold text-center'>{totaldata?.users}</div>
          </div>
          <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
            <div className='text-xl font-bold text-center'>TOTAL COMPANIES</div>
            <div className='text-green-300 text-2xl font-bold text-center'>{totaldata?.companies}</div>
          </div>
          <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
            <div className='text-xl font-bold text-center'>TOTAL JOBS</div>
            <div className='text-green-300 text-2xl font-bold text-center'>{totaldata?.jobs}</div>
          </div>
          <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
            <div className='text-xl font-bold text-center'>ACTIVE JOBS</div>
            <div className='text-green-300 text-2xl font-bold text-center'>{totaldata?.activejobs}</div>
          </div>
          <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
            <div className='text-xl font-bold text-center'>BLOCKLIST</div>
            <div className='text-green-300 text-2xl font-bold text-center'>{totaldata?.blocklist}</div>
          </div>
          <div className='bg-white w-[50vw] md:w-[30vw] lg:w-[20vw] h-[18vh] p-6 rounded-xl flex flex-col justify-center shadow-lg gap-4'>
            <div className='text-xl font-bold text-center'>INACTIVE JOBS</div>
            <div className='text-green-300 text-2xl font-bold text-center'>{totaldata?.inactivejobs}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admindashboard
