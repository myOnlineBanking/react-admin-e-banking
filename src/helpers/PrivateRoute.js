import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom"; 
 
export function PrivateRoute({ children, ...rest }) {
  const authState = useSelector((state) => state["authReducer"]);
  const auth = authState.isAuthenticated; 
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

 
