import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import toast from 'react-hot-toast'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { RiDeleteBin5Line } from "react-icons/ri";


function Adminusers() {
  const [userdata, setuserdata] = useState([])

  const fetchusers = async () => {
    const res = await fetch(`${BASE_URL}/api/admin/getusers`, {
      method: "POST"
    })
    const data = await res.json()
    if (res.status == 200) {
      setuserdata(data.users)
    }
    if (res.status == 400 || res.status == 500) {
      toast.error(data.error)
    }
  }

  useEffect(() => {
    fetchusers()
  }, [])


  return (
    <div className='w-[90vw] p-5'>
      <div className='text-2xl lg:text-3xl logo text-center py-5'>USERS</div>
      <div class="relative overflow-x-auto shadow-md rounded-xl">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
              <th scope="col" class="px-6 py-3">
                Phone
              </th>
              <th scope="col" class="py-3 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((item, index) => {
              return <tr key={index} class="bg-white border-b  border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.Name}
                </th>
                <td class="px-6 py-4">
                  {item.Email}
                </td>
                <td class="px-6 py-4">
                  {item.Phonenumber}
                </td>
                <td className='px-8'>
                  <RiDeleteBin5Line size={20} className='cursor-pointer hover:text-red-500'/>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>



    </div>
  )
}

export default Adminusers
