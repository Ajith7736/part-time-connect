import React from 'react'
import { Outlet } from 'react-router-dom'
import Companypanel from './Companypanel'

function CompanyLayout() {
  return (
    <div>
      <div className='min-h-screen  bg-gray-200 flex'>
        <Companypanel />
        <Outlet />
      </div>
    </div>
  )
}

export default CompanyLayout
