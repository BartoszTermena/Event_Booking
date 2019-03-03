import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './components/pages/Auth'
import LoginPage from './components/pages/Login'
import EventsPage from './components/pages/Events'
import BookingsPage from './components/pages/Bookings'
import Nav from './components/layout/Nav'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Nav />
            <main>
            <Switch>
              <Redirect from='/' to='/signup' exact/>
              <Route path='/signup' component={AuthPage} />
              <Route path='/login' component={LoginPage} />
              <Route path='/events' component={EventsPage} />
              <Route path='/bookings' component={BookingsPage} />
            </Switch>
          </main>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
