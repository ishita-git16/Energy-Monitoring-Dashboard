import React, { useState, useEffect } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CContainer,
  CRow,
  CInputGroup,
  CInputGroupAppend,
} from "@coreui/react";
import axios from "axios";
import { useSnackbar } from "notistack";

const Registration = (props) => {
  const [data, setdata] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    axios({
      method: "GET",
      url: `/static_details`,
    })
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChangeHandler = (e) => {
    e.persist();
    setdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setIsSubmitting(true);
    const request = axios({
      method: "POST",
      url: "/register",
      data: data.serial_no,
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
  return data.serial_no === "" 
  ? 
  (
    <>
      <CContainer fluid>
        <CRow>
          <CCol xs="9" md="6">
            <CCard>
              <CCardHeader>Configration</CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal" onSubmit={handleSubmit}>
                  <CFormGroup row>
                    <CCol md="12">
                      <CInputGroup>
                        <CLabel htmlFor="exampleInputName2" className="pr-1">
                          Token
                        </CLabel>
                        <CInput
                          type="text"
                          id="token"
                          name="token"
                          onChange={onChangeHandler}
                          placeholder="Token"
                        />
                        <CInputGroupAppend>
                          <CButton type="submit" color="primary">
                            Submit
                          </CButton>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  ) 
  : 
  (
    <>
      <CContainer fluid>
        <CRow>
          <CCol xs="9" md="6">
            <CCard>
              <CCardHeader>Configration</CCardHeader>
              <CCardBody>
                <CForm className="form-horizontal">
                  <CFormGroup row>
                    <CCol md="12">
                      <CInputGroup>
                        <CLabel htmlFor="exampleInputName2" className="pr-1">
                          Serial No:
                        </CLabel>
                        <CCol xs="12" md="9">
                          <p className="form-control-static">
                            {data.serial_no}
                          </p>
                        </CCol>
                        <CInputGroupAppend>
                          <CButton type="submit" color="success">
                            Register
                          </CButton>
                        </CInputGroupAppend>
                      </CInputGroup>
                    </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};
export default Registration;
