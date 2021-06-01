import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import useForm from '../../../Validation/useForm';
import validate from '../../../Validation/LoginValidation';
import useAppContext from '../../../AuthProviders/contextLib';
import {useMutation} from 'react-query';

const Login = () => 
{
    const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(login, validate);


  // const [mutatePostTodo] = useMutation(
  //   text => axios.post('/api/data', { text }),
  //   {
  //     onSuccess: () => {
  //       // Query Invalidations
  //       // queryCache.invalidateQueries('todos')
  //       setText('')
  //     },
  //   }
  // )

  const mutation = useMutation(formData => {
    return fetch('/api', formData)
  })
  const onSubmit = event => {
    event.preventDefault()
    mutation.mutate(new FormData(event.target))
  }


  function login() {
    console.log('No errors, submit callback called!');
  }
  const divStyle = {
    color: 'red',
    
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit} noValidate>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text"  className={`input ${errors.username && 'is-danger'}`} name="username" onChange={handleChange} value={values.username || ''} required />
                      {errors.username && (
                    <p  style={divStyle} className="help is-danger">{errors.username}</p>
                  )}
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput className={`input ${errors.password && 'is-danger'}`} type="password" name="password" onChange={handleChange} value={values.password || ''} required  />
                      {errors.password && (
                  <p  style={divStyle} className="help is-danger">{errors.password}</p>
                )}
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" color="primary" className="px-4">Login</CButton>
                      </CCol>
                      </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
export default Login
