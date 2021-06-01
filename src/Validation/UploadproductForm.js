import { useState, useEffect } from 'react';
import { useHistory ,Redirect} from 'react-router-dom'


const UploadProductForm = (callback, validate) => 
{
    //const history = useHistory();


  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = (event) => 
  {

    if (event) event.preventDefault();
    //setErrors(validate(values));
    setIsSubmitting(true);
    const axios = require('axios');
     const formData = new FormData();
     //.replace(/^.*\\/, "")
     formData.append('excelFile', values.excelFile.replace("C:\\fakepath\\", ""));
    const request = axios({
      method: 'POST',
      url: 'http://192.168.1.226:3010/product_upload?cm_id=1',
      data: formData,
      headers: { 'Content-Type': 'application/json',
    
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYxOTEwODIwOX0.RqYf4IjrwakgyNcP_E-Zo1oIO5-EqdyMdZ97Huw7w14'}
    })

      
      

.then(function (response) {
    if (response.status < 200 || response.status >= 300) 
          {
            
          // history.push('/components/createcompany');
           //return <Redirect to="/components/createcompany" />
          }
          //return history.push('/components/company')
          //return <Redirect to="/components/company" />


    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
};

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default UploadProductForm;