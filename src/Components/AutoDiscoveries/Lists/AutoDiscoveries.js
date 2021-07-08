import React, { useEffect, useState } from 'react';
import { CDataTable, CContainer, CButton } from '@coreui/react';
import axios from 'axios';
const fields = ['mqtt_id', 'Device Id', 'Device Type', 'Friendly Name', 'ip', 'status', {
    key: 'Delete',
    label: 'Action',
    _style: { width: '1%' },
    sorter: false,
    filter: false
}
];
const AutoDiscoveries = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        axios({
            method: 'GET',
            url:  `/modbus/device`,
        }).then(res => {
            setData(res.data)
        })
            .catch(err => {
                console.log(err);
            })

    }, [])
    return (
        <CContainer fluid>
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

                    'Delete':
                        (item, index) => {
                            return (
                                <td className="py-2">
                                    <CButton
                                        key={item.device_code}
                                        id={item.device_code}
                                        active block color="danger"
                                        aria-pressed="true">
                                        Delete
                  </CButton>
                                </td>
                            )
                        },
                }} />
        </CContainer>
    )
}
export default AutoDiscoveries;