import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      
    }
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Config',
    to: '/config',
    icon: 'cil-settings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'System Settings',
    to: '/systemsettings',
    icon: 'cil-settings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Modbus Device Configration',
    to: '/modbus/list',
    icon: 'cil-settings',
  

    
  },
  
  /*{
    _tag: 'CSidebarNavDropdown',
    name: 'Components',
    route: '/components',
    icon: 'cil-puzzle',
    _children: [
      
      {
        _tag: 'CSidebarNavItem',
        name: 'Company',
        to: '/components/company',
      },
     {
        _tag: 'CSidebarNavItem',
        name: 'Product',
        to: '/components/product'
     },
     
    
    ],
  },*/
  
]
export default _nav
