import React, { useEffect, useState } from 'react';
import {
  CDataTable,
  CContainer,
  CButton, CSwitch,
  CCollapse, CCardBody,
  CCol, CFormGroup, CLabel, CInput, CForm, CAlert,
} from '@coreui/react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
const fields = ['friendly_name', 'unit', 'unique_tag', 'register_address', 'metric_type', 'enable', 'min_alarm', 'max_alarm', {
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

const MatricsList = (props) => {
  let history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { device_code } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [details, setDetails] = useState([]);
  const [data, setData] = useState([]);
  const [item, setItemdata] = useState({});
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }
  useEffect(() => {
    axios({
      method: 'GET',
      url: SERVER_URL + `/modbus/metrics?device_code=${device_code}`,
    }).then(response => {
      setData(response.data)
    })
  }, [])

  const onChangeHandler = (e) => {
    e.persist();
    var abc = [...data];
    abc[e.target.id][e.target.name] = e.target.value;
    setData(abc);
  }
  const handleSwitchChange = (e) => {
    let abc = [...data];
    abc[e.target.id][e.target.name] = !abc[e.target.id][e.target.name];
    setData(abc);
    //console.log(abc);
  }
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    const utag = data[event.target.id];
    const unique_tag = utag.unique_tag;
    console.log(unique_tag);
    axios({
      method: 'PUT',
      url: SERVER_URL + `/modbus/metrics?device_code=${device_code}&unique_tag=${unique_tag}`,
      data: utag
    })
      .then(function (response) {
        enqueueSnackbar("Success", {
          variant: 'success'
        })

      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("Error" + `${error.message}`, {
          variant: 'error'
        })
      });

  };
  return (
    <CContainer fluid>
      <CDataTable
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
                    onClick={() => { toggleDetails(index) }}
                    active block color="warning"
                    aria-pressed="true">
                    {details.includes(index) ? 'Cancel' : 'Edit'}
                  </CButton>
                </td>
              )
            },

          'details':
            (item, index) => {
              setItemdata(item)
              return (
                <CCollapse show={details.includes(index)}>
                  <CCardBody>
                    <CForm onSubmit={handleSubmit} id={index} className="form-horizontal">
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Realtime Mqtt:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CSwitch name="rt_enable"
                            id={index}
                            onChange={(event) => { handleSwitchChange(event) }}
                            checked={item.rt_enable}
                            className={'mx-1'} shape={'pill'} color={'primary'}
                            labelOn={'\u2713'} labelOff={'\u2715'} />
                        </CCol>
                        <CCol md="3">
                          <CLabel>hysteresis:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CInput name="hysteresis" id={index} value={item.hysteresis}
                            onChange={onChangeHandler}
                          // onChange={(event) => { onChangeHandler(event) }}
                          /><CLabel>Minutes</CLabel>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Local Storage</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CSwitch name="local_storage_enable"
                            id={index}
                            checked={item.local_storage_enable}
                            onChange={(event) => { handleSwitchChange(event) }}
                            className={'mx-1'} shape={'pill'} color={'primary'}
                            labelOn={'\u2713'} labelOff={'\u2715'} />
                        </CCol>
                        <CCol md="3">
                          <CLabel>Save Interval:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CInput id={index} name="save_interval" value={item.save_interval}
                            onChange={(event) => { onChangeHandler(event) }}
                          /><label>Seconds</label>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Cloud Storage</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CSwitch
                            name="cloud_storage_enable"
                            id={index}
                            onChange={(event) => { handleSwitchChange(event) }}
                            checked={item.cloud_storage_enable}
                            className={'mx-1'} shape={'pill'} color={'primary'} labelOn={'\u2713'}
                            labelOff={'\u2715'} />
                        </CCol>
                        <CCol md="3">
                          <CLabel>Min Alarm:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CInput id={index} name="min_alarm" value={item.min_alarm} onChange={onChangeHandler} /><label>Seconds</label>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Alaram Enable:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CSwitch name="alarm_enable"
                            id={index}
                            onChange={(event) => { handleSwitchChange(event) }}
                            checked={item.alarm_enable}
                            className={'mx-1'} shape={'pill'} color={'primary'}
                            labelOn={'\u2713'} labelOff={'\u2715'} />
                        </CCol>
                        <CCol md="3">
                          <CLabel>Max Alaram:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CInput id={index} name="max_alarm" value={item.max_alarm} onChange={onChangeHandler} /><CLabel>Minutes</CLabel>
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol md="3">
                          <CLabel>Enable:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CSwitch name="enable"
                            id={index}
                            onChange={(event) => { handleSwitchChange(event) }}
                            checked={item.enable}
                            className={'mx-1'} shape={'pill'} color={'primary'}
                            labelOn={'\u2713'} labelOff={'\u2715'} />
                        </CCol>
                        <CCol md="3">
                          <CLabel>Friendly Name:</CLabel>
                        </CCol>
                        <CCol xs="8" md="3">
                          <CInput id={index} name="friendly_name" value={item.friendly_name} onChange={onChangeHandler} required />
                        </CCol>
                      </CFormGroup>
                      <CButton id={index} type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                    </CForm>
                  </CCardBody>
                </CCollapse>
              )
            },

          'Delete':
            (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    key={item.device_code}
                    id={item.device_code}
                    //onClick={() => props.history.push(`/modbus/edit/${item.device_code}`)}
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
export default MatricsList;