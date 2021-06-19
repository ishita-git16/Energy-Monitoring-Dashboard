import React, { useEffect, useState } from 'react';
import { CDataTable, CContainer, CButton } from '@coreui/react';
import axios from 'axios';
import AddSchedule from '../Add/AddSchedule';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const fields = ['Name', 'End Device Type', 'Schedule Type', 'Associated Devices', 'version',
    {
        key: 'Edit',
        label: 'Action',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    }, {
        key: 'Delete',
        label: 'Action',
        _style: { width: '1%' },
        sorter: false,
        filter: false
    },
];
const ScheduleList = () => {
    const [data, setData] = useState([]);
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
            <AddSchedule/>
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
                    'Edit':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <CButton
                                        key={item.device_code}
                                        id={item.device_code}
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
                                        active block color="danger"
                                        aria-pressed="true">
                                        Delete</CButton>
                                </td>
                            )
                        },
                }} />
                </>
        </CContainer>
    )
}
export default ScheduleList;