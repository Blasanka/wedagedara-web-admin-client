import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import UserProfile from "components/UserProfile/UserProfile.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

// to network request
import axios from "axios";

const hist = createBrowserHistory();

axios.defaults.baseURL =
  "https://asia-east2-wedagedara-717e9.cloudfunctions.net/api";

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/profile" component={UserProfile} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
