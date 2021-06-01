import React from 'react';
import axios from "axios";
import {CAlert} from '@coreui/react';
/* Inserting Token through confogration form route-> Static_details */
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const AddToken = async ({ token }) => 
{
    const res = axios({
        method: 'POST',
        //url: `http://localhost:5001/static_details?token=${token}`,
            url:SERVER_URL + '/static_details?token=${token}',
        headers: {
            'Content-Type': 'application/json'
            //, 'Authorization': `Bearer ${access_token} `
        }
    })
    return res

}
export const GetSerialNo = async ({ token }) => 
{
    const res = axios({
        method: 'GET',
        url: SERVER_URL +'/static_details',
        
    })
    return res;

}
export const PostRegister = async () => 
{
    const res = axios({
        method: 'POST',
        url: SERVER_URL +'/register',
        
    })
    return res;

}
// export const GetNetworkDetail = async () => 
// {
//     const res = axios({
//         method: 'GET',
//         url: SERVER_URL +'/network',
        
//     })
    
//     return res;

// }
// export const UpdateNetworkConfig = async (data) => 
//     {
      
//       const res =  await axios({
//         method: 'PUT',
//         url:SERVER_URL +'/network',
//         data: data,
//         })
//         // .then(response=>{
//         //     if(response.status==='200')
//         //     {
//         //         return(
//         //             <CAlert color="success">
//         //             This is a success alert — check it out!
//         //           </CAlert>
//         //         )
//         //     }

//         // })
       
//         return res.data
//     }


// export const GetModbusDevice = async () => 
// {
//     const res = axios({
//         method: 'GET',
//         url: SERVER_URL +'/modbus/device',
        
//     })
//     return res;

// }
//  export const AddModbusDevice = async ({ ...data }) => 
// {
//       const res = axios({
//       method: 'POST',
//       url: SERVER_URL +'/modbus/device',
//       data: data
      
//       })
//     return res;
// }
// export const GetTemplateModbusData = async () => 
// {
//     const res = axios({
//         method: 'GET',
//         url: SERVER_URL +'/templates/modbus/meta',
        
//     })
//     return res;

// }
