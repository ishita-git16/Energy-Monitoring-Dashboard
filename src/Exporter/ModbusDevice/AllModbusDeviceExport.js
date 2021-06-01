import React, { useEffect, useState } from 'react';
import ReactExport from "react-export-excel";
import{CButton}from '@coreui/react';
import axios from 'axios';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const AllModubsDeviceExport=(props)=>
{
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
    return(
        <ExcelFile element={<CButton type="submit" color="success">Export data</CButton>}>
        <ExcelSheet data={data} name="Employees" filename="Modbus data">
          <ExcelColumn label="Channel no" value="channel_no" />
          <ExcelColumn label="Brand" value="brand" />
          <ExcelColumn label="Model" value="model" />
          <ExcelColumn label="Enable" value="enable" />
         </ExcelSheet>
      </ExcelFile>
    )
}
export default AllModubsDeviceExport;