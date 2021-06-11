import React, { useEffect, useState } from 'react';
import {
    CButton, CModal, CModalBody, CSelect, CModalHeader,
    CModalTitle, CForm, CCol, CLabel, CFormGroup, CInput
}
    from '@coreui/react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const AddModubsDevice = (props) => {
    const [modal, setModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tempdatas, setTempdata] = useState([]);
    const [mdata, setMdata] = useState();
    const [templatename, setTemplatename] = useState([]);
    const [channelList, setChanelList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        axios({
            method: 'GET',
            url: SERVER_URL + `/templates/modbus/meta?download_meta=false`,
        }).then(res => {
            setTempdata(res.data)

        })
            .catch(err => {
                console.log(err);
            })
    }, [])
    const handleTemplateChange = (e) => {
        setTemplatename(e.target.value);
        var i;
        for (i = 0; i < tempdatas.length; i++) {
            if (tempdatas[i].template_name === e.target.value) {
                break;
            }
        }
        setChanelList((tempdatas[i].channel_no).split(","));
    };

    const onChangeHandler = (e) => {
        e.persist()
        setMdata(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (event) => {

        if (event) event.preventDefault();

        const moddata = {
            template_name: templatename,
            channel_no: mdata.channel_no,
            slave_id: mdata.slave_id,
            device_code: mdata.device_code
        }
        setIsSubmitting(true);
        const request = axios({
            method: 'POST',
            url: SERVER_URL + '/modbus/device',
            data: moddata,

        })
            .then(function (response) {
                response.setdata();
                enqueueSnackbar("Success", {
                    variant: 'success'
                })
            })
            .catch(function (error) {
                console.log(error);
                enqueueSnackbar("error" + `${error.detail}`, {
                    variant: 'error'
                })
            });
    };
    return (
        <>
            <CButton type="submit" onClick={() => setModal(!modal)} color="info">Add Modbus Device</CButton>
            <CModal show={modal} onClose={setModal}>
                <CModalHeader closeButton>
                    <CModalTitle>Modal title</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm onSubmit={handleSubmit} className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="text-input">Template Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CSelect
                                    className="form-control"
                                    name="template_name"
                                    onChange={(event) => { handleTemplateChange(event) }}
                                >
                                    {tempdatas.map((post, i) =>
                                        <option key={i}>{post.template_name}</option>)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="text-input">Channel No</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CSelect
                                    className="form-control"
                                    name="channel_no"
                                    onChange={onChangeHandler}  >
                                    {channelList.map((index, i) =>
                                        <option key={i}>{index}</option>)}
                                </CSelect>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="text-input">Slave Id</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="text-input" name="slave_id" onChange={onChangeHandler} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="text-input">Modbus Port</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="text-input" name="modbus_port" onChange={onChangeHandler} />
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="text-input">Device Code</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="text-input" name="device_code" onChange={onChangeHandler} />
                            </CCol>
                        </CFormGroup>
                        <CButton type="submit" color="primary">Add</CButton>
                        <CButton
                            color="secondary"
                            onClick={() => setModal(false)}
                         >Cancel</CButton>
                    </CForm>
                </CModalBody>
            </CModal>
        </>
    )
}
export default AddModubsDevice;