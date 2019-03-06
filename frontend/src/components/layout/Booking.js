import React from 'react'

const Booking = ({bookings, onDelete}) => {
  return (
    <React.Fragment>
        {bookings.map(booking => {
            return (
                <li key={booking._id} className="list-group-item d-flex 
                justify-content-between align-items-center">
                    <div>
                        {booking.event.title} - 
                        {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                    <button 
                    className="btn btn-info"
                    onClick={onDelete.bind(this, booking._id)}
                        >Cancel</button>
                    </div>
                </li>
            )})}
    </React.Fragment>
  )
}
export default Booking;