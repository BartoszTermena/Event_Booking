import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './components/pages/Auth'
import LoginPage from './components/pages/Login'
import EventsPage from './components/pages/Events'
import BookingsPage from './components/pages/Bookings'
import Nav from './components/layout/Nav'
import AuthContext from './context/auth-context'

import './App.css';


class App extends Component {
  state = {
    token: null,
    userId: null  
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({
      token: token,
      userId: userId
    });
  };

  logout = () => {
    this.setState({
      token: null,
      userId: null
    })
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{ 
            token: this.state.token, 
            userId: this.state.userId, 
            login: this.login, 
            logout: this.logout }}>
            <Nav />
              <main>
              <Switch>
                {this.state.token && <Redirect from='/login' to='/events' exact/>}
                {this.state.token && <Redirect from='/signup' to='/events' exact/>}
                {!this.state.token && <Route path='/signup' component={AuthPage} />}
                {!this.state.token && <Route path='/login' component={LoginPage} />}
                <Route path='/events' component={EventsPage} />
                {this.state.token && <Route path='/bookings' component={BookingsPage} />}
                {!this.state.token && <Redirect to='/login' exact/>}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
