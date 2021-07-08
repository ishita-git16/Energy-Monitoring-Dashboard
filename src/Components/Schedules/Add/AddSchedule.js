import React, { useState } from "react";
import {
  CButton,
  CModal,
  CModalBody,
  CSelect,
  CModalHeader,
  CModalTitle,
  CForm,
  CCol,
  CLabel,
  CFormGroup,
  CInput,
} from "@coreui/react";
import axios from "axios";
import { useSnackbar } from "notistack";

const AddSchedule = (props) => {
  const [modal, setModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempdatas, setTempdata] = useState([]);
  const [mdata, setMdata] = useState();
  const [templatename, setTemplatename] = useState([]);
  const [channelList, setChanelList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const onChangeHandler = (e) => {
    e.persist();
    setMdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    const moddata = {
      template_name: templatename,
      channel_no: mdata.channel_no,
      slave_id: mdata.slave_id,
      device_code: mdata.device_code,
    };
    setIsSubmitting(true);
    const request = axios({
      method: "POST",
      url: "/modbus/device",
      data: moddata,
    })
      .then(function (response) {
        response.setdata();
        enqueueSnackbar("Success", {
          variant: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("error" + `${error.detail}`, {
          variant: "error",
        });
      });
  };
  return (
    <>
      <CButton type="submit" onClick={() => setModal(!modal)} color="info">
        Add Schedule
      </CButton>
      <CModal show={modal} onClose={setModal}>
        <CModalHeader closeButton>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit} className="form-horizontal">
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">End Device Type</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  className="form-control"
                  name=""
                  onChange={onChangeHandler}
                ></CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Schedule Type</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  className="form-control"
                  name=""
                  onChange={onChangeHandler}
                >
                  {channelList.map((index, i) => (
                    <option key={i}>{index}</option>
                  ))}
                </CSelect>
              </CCol>
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel htmlFor="text-input">Name</CLabel>
              </CCol>
              <CCol xs="12" md="9">
                <CInput id="text-input" name="" onChange={onChangeHandler} />
              </CCol>
            </CFormGroup>
            <CButton type="submit" color="primary">
              Add
            </CButton>
            <CButton color="secondary" onClick={() => setModal(false)}>
              Cancel
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  );
};
export default AddSchedule;
