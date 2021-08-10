import React, { useState, useEffect } from "react";
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CInputRadio,
  CTabs,
  CCardHeader,
  CContainer,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CFormText,
  CSwitch,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import { useSnackbar } from "notistack";

const Systemsetting = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    axios({
      method: "GET",
      url: "/network",
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  const onChangeHandler = (e) => {
    e.persist();
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSwitchChange = (e) => {
    let abc = { ...data };
    abc[e.target.name] = !abc[e.target.name];
    setData(abc);
  };
  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    setIsSubmitting(true);
    const mdata = {
      dhcp_enable: data.dhcp_enable,
      ip_address: data.ip_address,
      dns_server2: data.dns_server2,
      default_gateway: data.default_gateway,
      subnet_mask: data.subnet_mask,
    };
    const request = axios({
      method: "PUT",
      url: "/network",
      data: JSON.stringify(mdata),
    })
      .then(function (response) {
        //response.setdata();
        enqueueSnackbar("Data updated successfully", {
          variant: "success",
        });
      })
      .catch(function (error) {
        console.log(error);
        enqueueSnackbar("Error" +`${error.response.data.detail}`, {
          variant: "error",
        });
      });
  };
  return (
    <CContainer fluid>
      <CRow>
        <CCol xs="12" md="12" className="mb-4">
          <CCard>
            <CCardHeader>System Settings</CCardHeader>
            <CCardBody>
              <CTabs>
                <CNav variant="tabs">
                  <CNavItem>
                    <CNavLink>Network</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>Date & Time</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink>License Info</CNavLink>
                  </CNavItem>
                </CNav>
                <CTabContent>
                  <CTabPane>
                    <CCardBody>
                      <CForm
                        onSubmit={handleSubmit}
                        className="form-horizontal"
                      >
                        <CFormGroup row>
                          <CCol tag="label" sm="3" className="col-form-label">
                            DHCP
                          </CCol>
                          <CCol sm="9">
                            <CSwitch
                             name="dhcp_enable"
                              onChange={(event) => {
                                handleSwitchChange(event);
                              }}
                              checked={data.dhcp_enable}
                              className={"mx-1"}
                              shape={"pill"}
                              color={"primary"}
                              labelOn={"\u2713"}
                              labelOff={"\u2715"}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">IP Address</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-input"
                              value={data.ip_address}
                              name="ip_address"
                              onChange={onChangeHandler}
                            />
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">Subnet Mask</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-input"
                              value={data.subnet_mask}
                              name="subnet_mask"
                              onChange={onChangeHandler}
                            />
                            {/* <CFormText>This is a help text</CFormText> */}
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">Gateway</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-input"
                              value={data.default_gateway}
                              name="default_gateway"
                              onChange={onChangeHandler}
                            />
                            {/* <CFormText>This is a help text</CFormText> */}
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">DNS Server 1</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-input"
                              value={data.dns_server1}
                              name="dns_server1"
                              onChange={onChangeHandler}
                            />
                            {/* <CFormText>This is a help text</CFormText> */}
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">DNS Server 2</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput
                              id="text-input"
                              value={data.dns_server2}
                              name="dns_server2"
                              onChange={onChangeHandler}
                            />
                            {/* <CFormText>This is a help text</CFormText> */}
                          </CCol>
                        </CFormGroup>
                        <CButton type="submit" size="sm" color="primary">
                          <CIcon name="cil-scrubber" /> Apply
                        </CButton>
                        {/* <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Test</CButton> */}
                      </CForm>
                    </CCardBody>
                  </CTabPane>
                  {/* ========================================Network Setting form end ==========================================*/}
                  <CTabPane>
                    <CCardBody>
                      <CForm className="form-horizontal">
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel htmlFor="text-input">Time Zone</CLabel>
                          </CCol>
                          <CCol xs="12" md="9">
                            <CInput id="text-input" name="name" />
                            <CFormText>This is a help text</CFormText>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                          <CCol md="3">
                            <CLabel>Set Time</CLabel>
                          </CCol>
                          <CCol md="9">
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                custom
                                id="inline-radio1"
                                name="inline-radios"
                                value="option1"
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="inline-radio1"
                              >
                                Automatic
                              </CLabel>
                            </CFormGroup>
                            <CFormGroup variant="custom-radio" inline>
                              <CInputRadio
                                custom
                                id="inline-radio2"
                                name="inline-radios"
                                value="option2"
                              />
                              <CLabel
                                variant="custom-checkbox"
                                htmlFor="inline-radio2"
                              >
                                Manual
                              </CLabel>
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row className="my-0">
                          <CCol xs="8" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="date-input">Date</CLabel>
                              <CInput
                                type="date"
                                id="date-input"
                                name="date-input"
                                placeholder="date"
                              />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="4">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">To</CLabel>
                              <CInput
                                id="postal-code"
                                placeholder="Postal Code"
                              />
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>
                        <CFormGroup row className="my-0">
                          <CCol xs="8" md="3">
                            <CFormGroup>
                              <CLabel htmlFor="city">Process Time</CLabel>
                              <CInput id="city" placeholder="Process Time" />
                            </CFormGroup>
                          </CCol>
                          <CCol xs="4">
                            <CFormGroup>
                              <CLabel htmlFor="postal-code">To</CLabel>
                              <CInput id="postal-code" placeholder="To" />
                            </CFormGroup>
                          </CCol>
                        </CFormGroup>
                        <CButton type="submit" size="sm" color="primary">
                          <CIcon name="cil-scrubber" /> Apply
                        </CButton>
                        {/* <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Test</CButton> */}
                      </CForm>
                    </CCardBody>
                  </CTabPane>
                  {/* ========================================Date and time Setting form end ==========================================*/}
                  <CTabPane></CTabPane>
                </CTabContent>
              </CTabs>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};
export default Systemsetting;
