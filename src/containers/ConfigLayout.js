import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import ReactRouterDemo from '../Components/ReactRouterDemo';

const ConfigLayout = () => {

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>  
        <div className="c-body">
          <ReactRouterDemo/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default ConfigLayout
