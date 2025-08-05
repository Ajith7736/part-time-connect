import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { RiDeleteBin5Line, RiDeleteBin6Line } from 'react-icons/ri';

function Admincompany() {
  const [companydata, setcompanydata] = useState([])
  const [dailogbox, setdailogbox] = useState(false)

  const fetchcompanies = async () => {
    const res = await fetch(`${BASE_URL}/api/admin/getcompanies`, {
      method: "POST"
    })
    const data = await res.json()
    if (res.status == 200) {
      setcompanydata(data.companies)
    }
    if (res.status == 400 || res.status == 500) {
      toast.error(data.error)
    }
  }

  useEffect(() => {
    fetchcompanies()
  }, [])

  const handlecancel = () => {
    setdailogbox(false)
  }

  const handledailog = () => {
    setdailogbox(true)
  }


  return (
    <div className='w-[90vw] p-5 relative'>
      {dailogbox && <>
        <div className='fixed z-1 lg:left-[40%]'>
          <div className='bg-white h-[30vh] max-[450px]:h-[25vh] max-[390px]:h-[35vh] w-[80vw] lg:w-[30vw] shadow-md rounded-xl p-10 flex flex-col items-center justify-center gap-8'>
            <div className='bg-red-300 p-2 rounded-full'><RiDeleteBin6Line className='text-red-600 size-10 max-[450px]:size-5' /></div>
            <div className='text-lg font-medium max-[450px]:text-xs'>Do you really wants to delete this account</div>
            <div className='flex gap-8'>
              <button className='border p-2 rounded-2xl border-gray-300 cursor-pointer font-medium text-gray-700 hover:bg-gray-100 max-[450px]:text-xs' onClick={handlecancel}>No, Cancel</button>
              <button className='bg-red-500 hover:bg-red-600 p-2 rounded-xl cursor-pointer font-medium text-white max-[450px]:text-xs'>Yes, I'm sure</button>
            </div>
          </div>
        </div>
      </>}
      <div className='text-3xl logo text-center py-5'>COMPANIES</div>
      <div className="relative overflow-x-auto shadow-md rounded-xl">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="py-3 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {companydata.map((item, index) => {
              return <tr key={index} className="bg-white border-b  border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.Name}
                </th>
                <td className="px-6 py-4">
                  {item.Email}
                </td>
                <td className="px-6 py-4">
                  {item.Phonenumber}
                </td>
                <td className='px-8'>
                  <RiDeleteBin5Line size={20} className='cursor-pointer hover:text-red-500' onClick={handledailog}/>
                </td>
              </tr>
            })}

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Admincompany
