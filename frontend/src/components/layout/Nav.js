import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import AuthContext from '../../context/auth-context'

const Navbar = (props) => {
    return (
      <AuthContext.Consumer>
        {(context) => {
          const links = context.token ? <SignedInLinks logout={context.logout}/> : <SignedOutLinks/>;
          return (
            <NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                  {links}
              </div>
          </NavWrapper>
          )
        }}
      </AuthContext.Consumer>
    )
  }

const NavWrapper = styled.nav`
  background: #fff;
  border-bottom: 0.1rem solid #e1e4e8;
  .nav-link {
    color: #000 !important;
    font-size: 1.3rem;
    text-transform: capitalize;
  }
  .navbar-toggler {
    background: transparent;
    border: 0.1rem solid var(--primary-color) !important;
    border-color: var(--primary-color);
  }
  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,<svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'><path stroke='rgb(144, 104, 190)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/></svg>") !important;
  }
  .navbar-toggler-icon 
  .logo-img img {
    width: 65px;
    border-radius: 45%;
    height: 65px;
  }
`;


export default Navbar;