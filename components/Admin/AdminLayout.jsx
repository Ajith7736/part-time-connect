import React from 'react'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div className='bg-gray-100 min-h-screen h-auto flex w-full'>
      <div className='bg-gray-950 min-h-screen h-auto w-[15vw]'></div>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
