import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function AdminLayout() {
  return (
    <div className='bg-gray-100 min-h-screen h-auto flex'>
      <Sidebar/>
      <Outlet />
    </div>
  )
}

export default AdminLayout
