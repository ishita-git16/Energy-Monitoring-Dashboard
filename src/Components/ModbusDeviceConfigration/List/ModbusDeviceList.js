import React, { useEffect, useState } from 'react';
import {CDataTable,CContainer,CButton} from '@coreui/react';
import axios from 'axios';
import AllModubsDeviceExport from '../../../Exporter/ModbusDevice/AllModbusDeviceExport';
import AddModubsDevice from '../../ModbusDeviceConfigration/Add/AddModbusDevice';

const fields = ['channel_no', 'brand', 'model', 'protocol_version', 'communication_type', 'baud_rate', 'device_code',
{ key: 'enable', _style: { width: '20%'} },
{
  key: 'Edit',
  label: 'Action',
  _style: { width: '1%' },
  sorter: false,
  filter: false
},

  {
    key: 'Delete',
    label: 'Action',
    _style: { width: '1%' },
    sorter: false,
    filter: false
  }
];
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const ModbusdeviceList = (props) => {
  // let history = useHistory();
  const [data, setData] = useState([])
  useEffect(() => {
    axios({
      method: 'GET',
      url: SERVER_URL + `/modbus/device`,
    }).then(res => {
      setData(res.data)
    })
      .catch(err => {
        console.log(err);
      })

  }, [])

  return (
    <CContainer fluid>
      <>
      <div align="left" > 
      {/* Add modbus device*/}<AllModubsDeviceExport />{/* export to excel button */} <AddModubsDevice />
      </div>
      <CDataTable
        textalign="center"
        items={data}
        fields={fields}
        itemsPerPageSelect
        itemsPerPage={20}
        columnFilter
        tableFilter
        footer
        hover
        sorter
        pagination
        striped
        responsive
        Action
        scopedSlots={{
          // 'status':
          // (item)=>(
          //   <td>
          //     <CBadge color={metricsdata}>
          //       {/* {item.metrics} */}
          //     </CBadge>
          //   </td>
          // ),

          'Edit':
            (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    key={item.device_code}
                    id={item.device_code}
                    //onClick={()=>props.history.push(`/modbus/edit/${item.device_code}`)}
                    onClick={() => props.history.push({ pathname: `/modbus/edit/${item.device_code}`, mydata: data })}
                    active block color="warning"
                    aria-pressed="true">
                    Edit
                </CButton>
                </td>
              )
            },
          'Delete':
            (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    key={item.device_code}
                    id={item.device_code}
                    onClick={() => props.history.push(`/modbus/edit/${item.device_code}`)}
                    active block color="danger"
                    aria-pressed="true">
                    Delete
                </CButton>
                </td>
              )
            },
        }} />
        </>
    </CContainer>
    
  )
}
export default ModbusdeviceList;