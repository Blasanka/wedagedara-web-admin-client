import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import UserProfile from "components/UserProfile/UserProfile.js";
import Login from "views/Login/login.js";
import LoginAuthRoute from "./util/LoginAuthRoute";
import AuthRoute from "./util/AuthRoute";

import "assets/css/material-dashboard-react.css?v=1.8.0";

// to network request
import axios from "axios";
import jwtDecode from "jwt-decode";

const hist = createBrowserHistory();

// axios.defaults.baseURL =
//   "http://localhost:5000/wedagedara-717e9/asia-east2/api";

export default class App extends React.Component {
  authenticated = false;
  constructor() {
    super();
    this.state = {
      authenticated: false,
      token: localStorage.FBIdToken,
      isLoading: true
    };

    if (this.state.token) {
      const decodedToken = jwtDecode(this.state.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("FBIdToken");
        delete axios.defaults.headers.common["Authorization"];
        window.location.href = "/login";
      } else {
        this.authenticated = true;
        axios.defaults.headers.common["Authorization"] = this.state.token;
      }
    }
  }

  render() {
    return (
      <div className="root" id="root">
        <Router history={hist}>
          <Switch>
            {/* <Route path="/admin" component={Admin} /> */}
            <Route path="/profile" component={UserProfile} />
            <Route path="/login" component={Login} />
            <AuthRoute
              path="/admin/dashboard"
              component={Admin}
              authenticated={this.authenticated}
            />
            <Route path="/admin" component={Admin} />
            <Redirect exact from="/admin" to="/admin/dashboard" />
            <Redirect exact from="/" to="/login" />
          </Switch>
        </Router>
      </div>
    );
  }
}
