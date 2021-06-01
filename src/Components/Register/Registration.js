import React from 'react'
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
    CInputGroup,CInputGroupAppend
  } from '@coreui/react'
  import {useQuery,useMutation,} from 'react-query'
  import {useForm} from 'react-hook-form';
  import {AddToken,GetSerialNo,PostRegister} from '../../Dataproviders/dataProvider';
  import {useHistory} from 'react-router-dom';

const Registration = (props) => 
 {
  const history = useHistory()
  const {isLoading,data, isError,error} = useQuery(["posts"], GetSerialNo);
  const { register, handleSubmit } = useForm();
  const { mutateAsync} = useMutation(AddToken);
  const addMutation = useMutation(PostRegister)
  /**========== called when serial no is empty */
  const onSubmit = async (data) => 
  {
       await mutateAsync({...data})
       window.location.reload();
       history.push("/registration");
  }
   /** ==========called when serial no is not empty and to register device */
  const onSubmit1 = async () => 
  {
       await addMutation.mutateAsync()
       //window.location.reload();
       //history.push("/registration")
  }
  
  
if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error getting posts...{error.message}</p>
  }

  if(data.data.serial_no ==='')
  {
    return(
     <CContainer fluid>
          <CRow >
          <CCol xs="9" md="6">
            <CCard>
              <CCardHeader>
            Configration
               </CCardHeader>
              <CCardBody>
                <CForm  onSubmit={handleSubmit(onSubmit)}className="form-horizontal">
                <CFormGroup row>
                    <CCol md="12"> 
                      <CInputGroup>
                      <CLabel htmlFor="exampleInputName2" className="pr-1">Token</CLabel>
                        <CInput type="text"{...register("token")} id="token" name="token" placeholder="Token" />
                        <CInputGroupAppend>
                          <CButton  type="submit" color="primary">Submit</CButton>
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
          )
  }
  else
  {
    return(
          <CContainer fluid>
          <CRow >
          <CCol xs="9" md="6">
            <CCard>
              <CCardHeader>
            Configration
             </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit(onSubmit1)}className="form-horizontal">
                <CFormGroup row>
                    <CCol md="12">
                      <CInputGroup>
                      <CLabel htmlFor="exampleInputName2" className="pr-1">Serial  No:</CLabel>
                      <CCol xs="12" md="9">
                    <p className="form-control-static">{data.data.serial_no}</p>
                  </CCol>
                        <CInputGroupAppend>
                          <CButton type="submit"  color="success">Register</CButton>
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
    )
  }
}
export default Registration;