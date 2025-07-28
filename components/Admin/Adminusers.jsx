import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import toast from 'react-hot-toast'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Adminusers() {
    const [userdata, setuserdata] = useState([])

 const fetchusers = async () => {
    const res = await fetch(`${BASE_URL}/api/admin/getusers`,{
     method : "POST"
    })
    const data = await res.json()
    if(res.status == 200){
        setuserdata(data.users)
    }
    if(res.status == 400 || res.status == 500){
        toast.error(data.error)
    }
 }

 useEffect(() => {
   fetchusers()
 }, [])
 

  return (
    <div className='w-full'>
      <div className='text-3xl logo text-center pt-10'>USERS</div>
      {userdata.map((item,index)=>{
        return <div  key={index} className='text-center pt-10'>
        <div>{item.Name}</div>
        <div>{item.Email}</div>
        </div>
      })}
    </div>
  )
}

export default Adminusers
