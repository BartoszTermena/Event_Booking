import React, { Component } from 'react'
import AuthContext from '../../context/auth-context'
import Spinner from '../layout/spinner/Spinner'

class Bookings extends Component {
  state = {
    bookings: [],
    isLoading: false
  }
  static contextType = AuthContext;
  
  componentDidMount() {
    this.fetchBookings();
  }

  fetchBookings = () => {
  this.setState({isLoading: true})
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
            }
          }
        }
      `
    };

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        console.log(res)
      }
      return res.json()
    })
    .then(resData => {
      this.setState({
        bookings: resData.data.bookings,
        isLoading: false
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false })
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? <Spinner /> : (
          <ul>
          {this.state.bookings.map(booking => {
            return (
            <li key={booking._id}>
              {booking.event.title} - 
              {new Date(booking.createdAt).toLocaleDateString()}
            </li>
          )})}
        </ul>
        )}
      </React.Fragment>
    )
  }
}
export default Bookings