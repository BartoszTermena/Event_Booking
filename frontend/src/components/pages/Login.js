import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class Auth extends Component {
  state = {
    email: '',
    password: ''
  }
  handleLogIn = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    
    const requrestBody = {
      query: `
        query {
          login(
            email: "${this.state.email}",
            password: "${this.state.password}"
          ) {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requrestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      console.log(resData)
    })
    .catch(err => {
      console.log(err)
    });
  };
  render() {
    return (
      <form className="container-fluid py-5" onSubmit={this.submitHandler}>
        <div className="form-group input-group">
          <div className="input-group-prepend">
          <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
          </div>
              <input name="email" onChange={this.handleLogIn} className="form-control" placeholder="E-Mail" type="email"/>
          </div> 
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
          </div>
              <input name="password" onChange={this.handleLogIn} className="form-control" placeholder="Password" type="password"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Log In  </button>
         </div>
          <p className="text-center">Have not got an account? <Link to="signup">Sign Up </Link></p>                                                                 
      </form>
    )
  }
}
export default Auth;