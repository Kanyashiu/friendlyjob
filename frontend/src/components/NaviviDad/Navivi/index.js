import React from 'react';
import styled from 'styled-components';

import { useSpring, animated, config } from 'react-spring';
import { NavLink } from 'react-router-dom';
import ModalConnexion from 'src/containers/ModalConnexion';
import ModalInscription from 'src/containers/ModalInscription';
import { Button, Popup } from 'semantic-ui-react';


import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';

import './navivi.scss';
import 'src/styles/_vars.scss';

const Navbar = ({
  isOpen,
  handleNavbar,
  isLogged,
  logOut,
  requestList,
}) => {
  const handleClick = () => {
    logOut();
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  };

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  });

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  });

  const waitingRequest = requestList.filter((request) => request.status === 'En attente');

  let demands = 'demande';
  if (waitingRequest.length > 1) {
    demands = 'demandes';
  }

  // for having a dynamic navbar without reload we need to get userRole from the state and not from the localstorage
  const userRole = localStorage.getItem('userRole');

  if (isLogged === false) {
    return (
      <>
        <NavBar style={barAnimation}>
          <FlexContainer>
            <div className="linkForNav">
              <NavLinks style={linkAnimation}>
                <NavLink exact className="link_OfLogo" to="/"><img className="logo_link_home" src="https://res.cloudinary.com/friendlyjob/image/upload/c_crop,q_100,w_1350/v1591561663/friendlyjob/logoC_dqklpb.png" alt="logo" /></NavLink>
                <NavLink exact to="/services/">Liste de nos services</NavLink>
                <NavLink to="/contact/">Qui sommes nous</NavLink>
              </NavLinks>
              <NavLinks className="buttonForModal">
                <ModalConnexion />
                <ModalInscription />
              </NavLinks>
            </div>
            <BurgerWrapper>
              <BurgerMenu
                isOpen={isOpen}
                handleNavbar={handleNavbar}
              />
            </BurgerWrapper>
          </FlexContainer>
        </NavBar>
        <CollapseMenu
          isOpen={isOpen}
          handleNavbar={handleNavbar}
          isLogged={isLogged}
          logOut={logOut}
        />
      </>
    );
  }
  if (isLogged === true) {
    return (
      <>
        <NavBar style={barAnimation}>
          <FlexContainer>
            <div className="linkForNav">
              <NavLinks style={linkAnimation}>
                <NavLink exact className="link_OfLogo" to="/"><img className="logo_link_home" src="https://res.cloudinary.com/friendlyjob/image/upload/c_crop,q_100,w_1350/v1591561663/friendlyjob/logoC_dqklpb.png" alt="logo" /></NavLink>
                <NavLink to="/services/">Liste de nos services</NavLink>
                {userRole === 'ROLE_ADMIN' ? (
                  <a href="http://api.friendlyjob.fr/login" rel="noopener noreferrer" target="_blank">admin</a>
                ) : (
                  <>
                    <NavLink to="/profil/">Profil</NavLink>
                    <NavLink to="/demandes/">Mes demandes</NavLink>
                  </>
                )}
              </NavLinks>
              <NavLinks className="buttonForModal">
                {userRole === 'JOBWORKER' && waitingRequest.length > 0 && requestList !== null ? (
                  <div className="notification">
                    <Popup
                      trigger={<i style={{ marginRight: '0' }} className="bell icon" color="red" />}
                      content={`Vous avez ${waitingRequest.length} ${demands} en attente`}
                    />
                  </div>
                ) : ''}
                <NavLink style={{ borderBottom: 'none', display: 'flex' }} to="/"><Button className="button_deconexion_trigger" onClick={handleClick}>Déconnexion</Button></NavLink>
              </NavLinks>
            </div>
            <BurgerWrapper>
              <BurgerMenu
                isOpen={isOpen}
                handleNavbar={handleNavbar}
              />
            </BurgerWrapper>
          </FlexContainer>
        </NavBar>
        <CollapseMenu
          isOpen={isOpen}
          handleNavbar={handleNavbar}
          isLogged={isLogged}
          logOut={logOut}
        />
      </>
    );
  }
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 2;
  font-size: 1.2rem;
`;

const FlexContainer = styled.div`
  max-width: 100%;
  display: flex;
  margin: auto;
  padding: 0.8em;
  justify-content: space-between;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-size: 0.9rem;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1rem;
    transition: all 300ms linear 0s;
    text-decoration: none;
    cursor: pointer;
    }


     a.active{
      color: #80c5b9;
      border-bottom: 1px solid #FF385C;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`;
