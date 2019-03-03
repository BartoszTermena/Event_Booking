import React from 'react'
import { Link } from 'react-router-dom';
import {ButtonContainer} from './Button';
import styled from 'styled-components'

const SignedInLinks = (props) => {
  return (
    <React.Fragment>
    <ul className="navbar-nav align-items-center ml-auto"> 
        <li className="nav-item ml-2">
            <Link to="signup">
            <ButtonContainer>
                Sign Up
            </ButtonContainer>
            </Link>
        </li>
        <li className="nav-item ml-2">
        <Link to="login">
            <ButtonContainer>
                Log In
            </ButtonContainer>
        </Link>
        </li>
    </ul>
    </React.Fragment>
  )
}



export default SignedInLinks;