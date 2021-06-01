import React from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from '../App';
import useForm from "../Validation/useForm";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useForm()

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default PrivateRoute;