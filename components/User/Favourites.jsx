import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { removefromwishlist } from '../../src/redux/wishlistSlice';
import { clearwishlist } from '../../src/redux/wishlistSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Favourites() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wishlist = useSelector(state => state.wishlist.items);
  const userlog = localStorage.getItem("user")
  const user = localStorage.getItem("userdata") && JSON.parse(localStorage.getItem("userdata"))
  const token = localStorage.getItem("token")
  const [wishlistdb, setwishlistdb] = useState([])


  // to delete the wishlist from the db

  const removewishlist = async (id) => {
    try {
      let res = await fetch(`${BASE_URL}/api/wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }, body: JSON.stringify({ userId: user.id, jobId: id })
      })
      let data = await res.json()
      if (res.status == 200) {
        toast.success(data.success)
      }
      if (res.status == 400 || res.status == 500) {
        toast.error(data.error)
      }
      if (res.status == 401) {
        localStorage.setItem("user", "Loggedout")
        navigate("/login")
      }
    } catch (err) {
      console.log(err);
    }
  }

  // to delete the wishlist when the cancel is clicked

  const handlecancel = (e, id) => {
    dispatch(removefromwishlist(id))
    removewishlist(id)
  }

  return (
    <div className='p-4 h-[90vh] bg-gray-100'>
      <div className='text-2xl font-bold logo text-center'>My Wish List</div>
      <div className='jobs flex flex-col items-center'>
        {wishlist.length == 0 && <><div className='text-xl mt-10 font-medium'>There is no data here</div></>}
        {wishlist.map((item, index) => {
          return <div key={index} className='bg-white w-full lg:w-[70vw] h-auto mt-5 rounded-md shadow-lg p-3 lg:p-4 flex flex-col gap-3 font-medium'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-10 items-center'>
                <div className='flex flex-col gap-2'>
                  <img src="man.png" className='w-15' alt="" />
                  <p className='font-medium text-sm lg:text-lg max-[450px]:text-xs'>{item.Companyname}</p>
                </div>
                <div>
                  <h1 className='text-lg lg:text-xl logo  max-[450px]:text-xs'>{item.title}</h1>
                  <p className='text-sm lg:text-lg max-[450px]:text-xs'>{item.Date.split("T")[0]}</p>
                </div>
              </div>
              <div className='flex items-center gap-3 max-[450px]:flex-col'>
                <p className='text-gray-600 cursor-pointer text-sm lg:text-lg max-[450px]:text-xs'>Go to your job</p>
                <p className='text-red-500 cursor-pointer text-sm lg:text-lg font-bold bg-red-100 px-2 py-1 rounded-full max-[450px]:text-xs' onClick={(e) => handlecancel(e, item._id)}>Cancel</p>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default Favourites
