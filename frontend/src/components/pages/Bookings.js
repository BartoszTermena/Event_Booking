import React, { Component } from 'react'
import Booking from '../layout/Booking'
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

  deleteBookingHandler = bookingId => {
    this.setState({isLoading: true})
    const requestBody = {
      query: `
        mutation {
          cancelBooking(bookingId: "${bookingId}") {
              _id
              title
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
      this.setState(prevState => {
        const updatedBookings = prevState.bookings.filter(booking => {
          return booking._id !== bookingId;
        });
        return {bookings: updatedBookings, isLoading: false}
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({isLoading: false })
    });
  };

  render() {
    return (
      <div className="container py-5">
      <p>Bookings: </p>
        {this.state.isLoading ? <Spinner /> : (
          <ul className="list-group">
          <Booking
            bookings={this.state.bookings}
            onDelete={this.deleteBookingHandler}/>
        </ul>
        )}
      </div>
    )
  }
}
export default Bookings