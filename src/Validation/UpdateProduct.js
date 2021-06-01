import { useState, useEffect } from 'react';
import { useHistory ,Redirect} from 'react-router-dom'

//callback, validate
const UpdateProduct = () => 
{
    const history = useHistory();


  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  

  const handleSubmit = (event) => 
  {

    if (event) event.preventDefault();
    //setErrors(validate(values));
    setIsSubmitting(true);
    const axios = require('axios');
    
    const data=
    { 
      prod_code: values.prod_code,
      prod_name: values.prod_name,
      prod_type:values.prod_type,
      make:values.make,
      model:values.model,
    }

    const request = axios({
      method: 'PUT',
      url: 'http://192.168.1.226:3010/product?prod_id=888&cm_id=1',
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json',
    
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYxOTEwODIwOX0.RqYf4IjrwakgyNcP_E-Zo1oIO5-EqdyMdZ97Huw7w14'}
    })

.then(function (response) {
    if (response.status < 200 || response.status >= 300) 
          {
           history.push('/components/createcompany');
           //return <Redirect to="/components/createcompany" />
          }
          return history.push('/components/company')
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

export default UpdateProduct;