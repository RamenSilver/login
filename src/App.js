import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";

//screens
import Index from './yubisuma/js/Index';
import Login from './yubisuma/js/Login';
import Waiting from './yubisuma/js/Waiting';
import Main from './yubisuma/js/Main';
require('dotenv').config();

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/login/" component={Login} />
          <Route exact path="/waiting/" component={Waiting} />
          <Route exact path="/main/" component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
