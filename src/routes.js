import React from 'react';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Registration = React.lazy(() => import('./Components/Register/Registration'));
const Systemsetting = React.lazy(() => import('./Components/SystemSettings/Systemsetting'));
const ModbusDeviceList = React.lazy(() => import('./Components/ModbusDeviceConfigration/List/ModbusDeviceList'));
const ModbusDeviceEdit = React.lazy(() => import('./Components/ModbusDeviceConfigration/Edit/ModbusDeviceEdit'));
const routes = [
   { path: '/dashboard', name: 'Dashboard', component: Dashboard },
   { path: '/config', name: 'Config', component: Registration },
   { path: '/systemsettings', name: 'System Settings}', component: Systemsetting },
   { path: '/modbus/list', name: 'Modbus Device Configration', component: ModbusDeviceList },
   { path: '/modbus/edit/:device_code', name: 'Modbus Edit', component: ModbusDeviceEdit },
];
export default routes;
