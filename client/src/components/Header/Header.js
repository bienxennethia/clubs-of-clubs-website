import React, { useState } from 'react';
import { NavLink  } from 'react-router-dom';

import "./Header.scss";

// components
import { navigationItems } from './navigationItems';
import { ReactComponent as Logo } from "../../icons/logo.svg";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <div className="header__container">
        {/* <nav className={`navigation ${isSticky ? 'sticky' : ''}`}> */}
        <nav className="navigation">
          <div className="navigation__container">
            <div className="navigation__content">
                <NavLink to="/" >
                  <Logo className="navigation__logo logo"></Logo>
                </NavLink>
            </div>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <ul className={`navigation__items ${isMenuOpen ? 'open' : ''}`}>
              {navigationItems.map((item, index) => (
                <li className='navigation__item' key={index}>
                  <NavLink activeclassname="active" to={item.link}>
                    <div className="navigation__link">
                      <span className='navigation__link--text'>{item.name}</span>
                      <Logo className="navigation__link--icon logo"></Logo>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header;