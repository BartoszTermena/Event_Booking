import React from 'react'
import { Link } from 'react-router-dom';
import {ButtonContainer} from './Button';

const SignedInLinks = (props) => {
  return (
    <React.Fragment>
    <ul className="navbar-nav align-items-center ml-auto"> 
        <li className="nav-item ml-2">
        <Link to="/events">
            <ButtonContainer>
                Events
            </ButtonContainer>
          </Link>
        </li>
        <li className="nav-item ml-2">
        <Link to="/bookings">
            <ButtonContainer>
               Bookings
            </ButtonContainer>
        </Link>
        </li>
        <li className="nav-item ml-2">
            <ButtonContainer onClick={props.logout}>
                Log Out
            </ButtonContainer>
        </li>
    </ul>
    </React.Fragment>
  )
}



export default SignedInLinks;