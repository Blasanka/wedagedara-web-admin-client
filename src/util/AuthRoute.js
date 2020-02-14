import React from "react";

import { Route, Redirect } from "react-router-dom";

import PropTypes from "prop-types";

const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated === false ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

AuthRoute.prototype = {
  user: PropTypes.object.isRequired
};

export default AuthRoute;
