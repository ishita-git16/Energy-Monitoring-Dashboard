import React from 'react';
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Registration = React.lazy(() => import('./Components/Register/Registration'));
const Systemsetting = React.lazy(() => import('./Components/SystemSettings/Systemsetting'));
const ModbusDeviceList = React.lazy(() => import('./Components/ModbusDeviceConfigration/List/ModbusDeviceList'));
const ModbusDeviceEdit = React.lazy(() => import('./Components/ModbusDeviceConfigration/Edit/ModbusDeviceEdit'));
const AutoDiscoveries = React.lazy(() => import('./Components/AutoDiscoveries/Lists/AutoDiscoveries'));
const ScheduleList = React.lazy(() => import('./Components/Schedules/Lists/ScheduleList'));
const ZoneList = React.lazy(() => import('./Components/Zones/Lists/ZoneList'));
const Energyhvac = React.lazy(() => import('./Components/EnergyHVAC/Lists/Energyhvac'));
const EnergyHVAC = React.lazy(() => import('./Components/EnergyHVAC/Lists/Energyhvac'));
const routes = [
   { path: '/dashboard', name: 'Dashboard', component: Dashboard },
   { path: '/config', name: 'Config', component: Registration },
   { path: '/systemsettings', name: 'System Settings}', component: Systemsetting },
   { path: '/modbus/list', name: 'Modbus Device Configration', component: ModbusDeviceList },
   { path: '/modbus/edit/:device_code', name: 'Modbus Edit', component: ModbusDeviceEdit },
   { path: '/autodiscoveries', name: 'AutoDiscoveries', component: AutoDiscoveries },
   { path: '/schedulelist/list', name: 'Schedule', component: ScheduleList },
   { path: '/zone/list', name: 'Zone', component: ZoneList },
   { path: '/hvacunit/list', name: 'Hvac Unit', component: EnergyHVAC }

];
export default routes;
