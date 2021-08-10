import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">Energy Monitoring</a>
        <span className="ml-1">&copy; 2021</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://smartiam.in/" target="_blank" rel="noopener noreferrer">Integrated Active Monitoring</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
