import './App.css';
// core styles
import "./scss/volt.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Department from "./pages/department/Department";
import Patient from "./pages/patient/Patient";
import Diagnosis from "./pages/diagnosis/diagnosis";
import Appointment from "./pages/appointment/appointment";
import { BrowserRouter as Router, Route, Switch,Redirect, useHistory } from "react-router-dom";
import axios from 'axios';
import { _retrieveToken } from './Service/function';
import { useEffect, useState } from 'react';

function App() {
  
  return (
    <Router>
        <Switch>
      <Route exact path="/dashboard"component={() => <Home />} />
      <Route exact path="/"component={() => <Login />} />
      <Route exact path="/login"component={() => <Login />} />
      <Route exact path="/department"component={() => <Department />} />
      <Route exact path="/patient"component={() => <Patient />} />
      <Route exact path="/appointment"component={() => <Appointment />} />
      <Route exact path="/diagnosis"component={() => <Diagnosis />} />
    </Switch>

  </Router>
  );
}

export default App;
