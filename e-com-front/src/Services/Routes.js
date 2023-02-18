import React from "react";
import { Switch, Route } from "react-router";
import LoginForm from "../components/Login";

import PrivateRoute from "../components/PrivateRoute";
import Dashboard from "../components/Dashboard";
import DataTable from "../components/User";
import AddUser from "../components/AddUser";
import UserUpdate from "../components/UserUpdate";

const routes = (
  <Switch>
    <Route exact path="/" component={LoginForm} />
    {/* <Route exact path="/dashboard" component={PrimarySearchAppBar} /> */}
    <PrivateRoute
      path="/dashboard"
      exact={true}
      component={Dashboard}
      // handleChildFunc={this.handleChildFunc}
    />
    <PrivateRoute
      path="/user"
      exact={true}
      component={DataTable}
      // handleChildFunc={this.handleChildFunc}
    />
    <PrivateRoute
      path="/adduser"
      exact={true}
      component={AddUser}
      // handleChildFunc={this.handleChildFunc}
    />
    <PrivateRoute
      path="/updateuser/:id"
      exact={true}
      component={UserUpdate}
      // handleChildFunc={this.handleChildFunc}
    />
    {/* <PrivateRoute
      path="/user"
      exact={true}
      component={Tables}
      // handleChildFunc={this.handleChildFunc}
    /> */}
  </Switch>
);

export default routes;
