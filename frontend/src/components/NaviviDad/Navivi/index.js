import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { NavLink } from 'react-router-dom';
import ModalConnexion from 'src/containers/ModalConnexion';
import ModalInscription from 'src/containers/ModalInscription';

import Brand from './Brand';
import BurgerMenu from './BurgerMenu';
import CollapseMenu from './CollapseMenu';

import './navivi.scss';
import 'src/styles/_vars.scss';

const Navbar = (props) => {
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

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <div className="brandForNav">
            <Brand />
          </div>
          <div className="linkForNav">
            <NavLinks style={linkAnimation}>
              <NavLink exact to="/services">Liste de nos services</NavLink>
              <a href="#inscription">Devenir JobWorker</a>
              <NavLink to="/contact">Qui sommes nous</NavLink>
            </NavLinks>
            <NavLinks className="buttonForModal">
              <ModalConnexion />
              <ModalInscription />
            </NavLinks>
          </div>
          <BurgerWrapper>
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState} 
        handleNavbar={props.handleNavbar}
      />
    </>
  );
};

export default Navbar;

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background: #2d3436;
  z-index: 1;
  font-size: 1.4rem;
`;

const FlexContainer = styled.div`
  max-width: 100%;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  height: 4rem;
`;

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #dfe6e9;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    margin: 0 1.5rem;
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