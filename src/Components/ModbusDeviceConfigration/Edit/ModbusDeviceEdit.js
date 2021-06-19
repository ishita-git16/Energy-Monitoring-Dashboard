import React, { useState, useEffect } from 'react'
import {
  CCol, CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCollapse,
  CCardHeader, CContainer, CForm, CFormGroup, CLabel, CInput, CSwitch, CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import MatricsList from '../List/MetricsList';
import { useSnackbar } from 'notistack';
//import validator from 'validator';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ModbusDeviceEdit = (props) => {

  const { device_code } = useParams();
  const [accordion, setAccordion] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mdata, setMData] = useState({});
  const [alaramdata, SetAlaramData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const res = axios({
      method: 'GET',
      url: SERVER_URL + `/modbus/device?device_code=${device_code}`,
    }).then(res => {
      setMData(res.data);
      SetAlaramData(res.data.alarm_config);


      // console.log(res.data.alarm_config)
    })

  }, [])
  const onChangeHandler = (e) => {
    e.persist()
    setMData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleSwitchChange = (e) => {
    let abc = { ...mdata };
    abc[e.target.name] = !abc[e.target.name];
    setMData(abc);
  }
  const handleAlaramSwitchChange = (e) => {
    let pqr = { ...alaramdata };
    pqr[e.target.name] = !pqr[e.target.name];
    SetAlaramData(pqr);
  }

  const handleSubmit = (event) => {
    const mydata = {

      slave_id: mdata.slave_id,
      device_name: mdata.device_name,
      channel_no: mdata.channel_no,
      communication_type: mdata.communication_type,
      baud_rate: mdata.baud_rate,
      parity: mdata.parity,
      stopbits: mdata.stopbits,
      bytesize: mdata.bytesize,
      total_register: mdata.total_register,
      register_offset: mdata.register_offset,
      word_order: mdata.word_order,
      byte_order: mdata.byte_order,
      rt_interval: mdata.rt_interval,
      local_storage_enable: mdata.local_storage_enable,
      cloud_storage_enable: mdata.cloud_storage_enable,
      enable: mdata.enable,
      rt_enable: mdata.rt_enable,
      timeout: mdata.timeout,
      batch_retry_times: mdata.batch_retry_times,
      poll_interval: mdata.poll_interval,
      save_interval: mdata.save_interval,
      test_mode: mdata.test_mode,
      alarm_config: { enable: alaramdata.enable, type: alaramdata.type, details: {} },

    }
    if (event) event.preventDefault();
    setIsSubmitting(true);
    const request = axios({
      method: 'PUT',
      url: SERVER_URL + `/modbus/device?device_code=${device_code}`,
      data: mydata


    })
      .then(function (response) {
        //response.setMdata()
        if (response.status === 200) { }
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
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>
              Modbus Device  Name :  <strong>{mdata.device_name}</strong>
              <h6>Sync Datetime : <strong>{mdata.syncdatetime}</strong> </h6>
            </CCardHeader>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>
                      Device Details
                  </CNavLink>
                  </CNavItem>
                  {/* <CNavItem>
                    <CNavLink>
                    Alaram Config
                  </CNavLink>
                  </CNavItem> */}
                  <CNavItem>
                    <CNavLink>
                      Metrics Details
                  </CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <CCardBody>
                      <CForm onSubmit={handleSubmit} className="form-horizontal">
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Enable</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                          <CSwitch name="enable"
                              checked={mdata.enable}
                              onChange={(event) => { handleSwitchChange(event) }}
                              lassName={'mx-1'}
                              name="enable"
                              shape={'pill'} color={'primary'} labelOn={'\u2713'}
                              labelOff={'\u2715'} />
                          </CCol>
                          <CCol md="3">
                            <CLabel>Model:</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                            <p className="form-control-static">{mdata.model}</p>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                          <CLabel htmlFor="text-input">Test Mode</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                          <CSwitch name="test_mode"
                              checked={mdata.test_mode}
                              id="test_mode"
                              key="test_mode"
                              onChange={(event) => { handleSwitchChange(event) }}
                              className={'mx-1'} shape={'pill'} color={'primary'} labelOn={'\u2713'}
                              labelOff={'\u2715'}
                            />
                          </CCol>
                          <CCol md="3">
                            <CLabel>Brand:</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                            <p className="form-control-static">{mdata.brand}</p>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                          <CLabel>Slave Id:</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                          <CInput name="slave_id" value={mdata.slave_id} onChange={onChangeHandler} />
                          </CCol>
                          <CCol md="3">
                            <CLabel>Port:</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                            <p className="form-control-static">{mdata.modbus_port}</p>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Poll Interval</CLabel>
                          </CCol>
                          <CCol xs="8" md="3">
                            <CInput name="poll_interval" value={mdata.poll_interval} onChange={onChangeHandler} /><CLabel>Seconds</CLabel>
                          </CCol>
                        </CFormGroup>
                        <CButton
                          block
                          color="link"
                          className="text-left m-0 p-0"
                          onClick={() => setAccordion(accordion === 0 ? null : 0)} >
                          <h5 className="m-0 p-0">Storage Details </h5>
                        </CButton><n></n><br></br>
                        <CCollapse show={accordion === 0}>
                          <CCardBody>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Cloud Storage:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CSwitch name="cloud_storage_enable"
                                  //value={mdata.cloud_storage_enable}
                                  onChange={(event) => { handleSwitchChange(event) }}
                                  checked={mdata.cloud_storage_enable}
                                  className={'mx-1'} shape={'pill'} color={'primary'}
                                  labelOn={'\u2713'} labelOff={'\u2715'} />
                              </CCol>
                              <CCol md="3">
                                <CLabel>Real Time Interval:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                              <CInput name="rt_interval" value={mdata.rt_interval} onChange={onChangeHandler} /><label>Seconds</label>                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Local Storage</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CSwitch name="local_storage_enable"
                                  //value={mdata.local_storage_enable}
                                  type="checkbox"
                                  checked={mdata.local_storage_enable}
                                  onChange={(event) => { handleSwitchChange(event) }}
                                  className={'mx-1'} shape={'pill'} color={'primary'}
                                  labelOn={'\u2713'} labelOff={'\u2715'} />
                              </CCol>
                          </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Real Time Mqtt</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CSwitch
                                  name="rt_enable"
                                  onChange={(event) => { handleSwitchChange(event) }}
                                  checked={mdata.rt_enable}
                                  className={'mx-1'} shape={'pill'} color={'primary'} labelOn={'\u2713'}
                                  labelOff={'\u2715'} />
                              </CCol>

                            </CFormGroup>
                          </CCardBody>
                        </CCollapse>
                        <CButton
                          block
                          onChange={onChangeHandler}
                          color="link"
                          className="text-left m-0 p-0"
                          onClick={() => setAccordion(accordion === 2 ? null : 2)}>
                          <h5 className="m-0 p-0">Modbus Advanced</h5>
                        </CButton><br></br>
                        <CCollapse show={accordion === 2}>
                          <CCardBody>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Baud Rate:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="baud_rate" value={mdata.baud_rate} onChange={onChangeHandler} />
                              </CCol>
                              <CCol md="3">
                                <CLabel>Parity:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="parity" value={mdata.parity} onChange={onChangeHandler} />
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Stopbits:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="stopbits" value={mdata.stopbits} onChange={onChangeHandler} />
                              </CCol>
                              <CCol md="3">
                                <CLabel>Bytesize:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="bytesize" value={mdata.bytesize} onChange={onChangeHandler} />
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Total Register:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="total_register" value={mdata.total_register} onChange={onChangeHandler} />
                              </CCol>
                              <CCol md="3">
                                <CLabel>Register Offset:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="register_offset" onChange={onChangeHandler} value={mdata.register_offset} />
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Word Order:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="word_order" value={mdata.word_order} onChange={onChangeHandler} />
                              </CCol>
                              <CCol md="3">
                                <CLabel>Byte Order:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="byte_order" value={mdata.byte_order} onChange={onChangeHandler} />
                              </CCol>
                            </CFormGroup>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Time Out:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="timeout" value={mdata.timeout} onChange={onChangeHandler} />
                              </CCol>
                              <CCol md="3">
                                <CLabel>Batch Retry Times:</CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CInput name="batch_retry_times" value={mdata.batch_retry_times} onChange={onChangeHandler} />
                              </CCol>
                            </CFormGroup>
                          </CCardBody>
                        </CCollapse>
                        <CButton
                          block
                          onChange={onChangeHandler}
                          color="link"
                          className="text-left m-0 p-0"
                          onClick={() => setAccordion(accordion === 3 ? null : 3)}>
                          <h5 className="m-0 p-0">Alaram Config</h5>
                        </CButton>
                        <CCollapse show={accordion === 3}>
                          <CCardBody>
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel>Alaram Config Enable </CLabel>
                              </CCol>
                              <CCol xs="8" md="3">
                                <CSwitch name="enable"
                                  onChange={(event) => { handleAlaramSwitchChange(event) }}
                                  checked={alaramdata.enable}
                                  className={'mx-1'} shape={'pill'} color={'primary'} labelOn={'\u2713'}
                                  labelOff={'\u2715'} />
                              </CCol>
                            </CFormGroup>
                          </CCardBody>
                        </CCollapse><br></br>
                        <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                      </CForm>
                    </CCardBody>
                  </CTabPane>
                  <CTabPane>
                    <MatricsList></MatricsList>
                  </CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
export default ModbusDeviceEdit
