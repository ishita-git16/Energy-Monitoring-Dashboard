import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import Dashboard from '../views/dashboard/Dashboard';

const TheMyDashboard = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>  
        <div className="c-body">
          <Dashboard/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheMyDashboard
