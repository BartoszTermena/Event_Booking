import React from 'react'
import { Link } from 'react-router-dom';
import {ButtonContainer} from './Button';
import styled from 'styled-components'

const SignedInLinks = (props) => {
  return (
    <React.Fragment>
    <ul className="navbar-nav align-items-center ml-auto"> 
        <li className="nav-item ml-2">
        <a className="ml-auto">
        <Link to="/events">
            <ButtonContainer>
                Events
            </ButtonContainer>
          </Link>
        </a>
        </li>
        <li className="nav-item ml-2">
        <a className="ml-auto">
        <Link to="/bookings">
            <ButtonContainer>
               Bookings
            </ButtonContainer>
        </Link>
        </a>
        </li>
        <li className="nav-item ml-2">
        <a className="ml-auto">
            <ButtonContainer>
                Log Out
            </ButtonContainer>
        </a>
        </li>
    </ul>
    </React.Fragment>
  )
}



export default SignedInLinks;