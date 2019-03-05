import React from 'react'

const Event = props => {
  return (
    <ul className="list-group">
        <li  
        className="list-group-item d-flex 
        justify-content-between align-items-center">
        <div>
        <h4 className="text-left">{props.event.title}</h4>
        <h5 className="text-left">${props.event.price} - {new Date(props.event.date).toLocaleDateString()}</h5>
        </div>
        <div className="text-left">
            {props.event.creator._id === props.authUserId ? 
            <h6>Your the owner of this event.</h6>:
            <button className="btn btn-info"
              onClick={props.onDetail.bind(this, props.event._id)}
            >View Details</button>}
        </div>
        </li>
    </ul>
  )
}
export default Event;