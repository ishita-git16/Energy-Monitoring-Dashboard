import React from 'react'
import CIcon from '@coreui/icons-react';
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
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
    icon: 'cilLaptop',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Modbus Device Configration',
    to: '/modbus/list',
    icon: 'cilApplicationsSettings',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Auto Discovries',
    to: '/autodiscoveries',
    icon: 'cil-settings',

  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Schedule',
    to: '/schedulelist/list',
    icon: 'cilCalendar',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Zone',
    to: '/zone/list',
    icon: 'cilMap',
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Energy HVAC',
    route: '/components',
    icon: 'cil-puzzle',
    _children: [

      {
        _tag: 'CSidebarNavItem',
        name: 'HVAC  Unit',
        to: '/hvacunit/list',
      },
      //  {
      //     _tag: 'CSidebarNavItem',
      //     name: 'Product',
      //     to: '/components/product'
      //  },
    ],
  },
]
export default _nav
