import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import "./Header.scss";

import { navigationItems } from './navigationItems';
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import { ReactComponent as ProfileIcon } from "../../icons/profile.svg";

import {useCommonState} from "../../data/commonState";

const Header = () => {
  const { isLoggedIn, isVisitor, setModalIdOpen, modalIdOpen } = useCommonState();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    return isMobile ? setMenuOpen(false) : null;
  };

  const profileBtn = () => {
    if (isLoggedIn) {
      setModalIdOpen("profile");
    } else {
      setModalIdOpen("login");
    }
  };

  return (
    <div className="header">
      <div className="header__container">
        <nav className="navigation">
          <div className="navigation__container">
            <div className="navigation__content">
                <NavLink to="/" title='Home'>
                  <Logo className="navigation__logo logo"></Logo>
                </NavLink>
            </div>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <ul className={`navigation__items ${isMenuOpen ? 'open' : ''}`}>
                <li className='navigation__item' key="home">
                  <NavLink to="/" onClick={closeMenu} title='Home'>
                    <div className="navigation__link">
                      <span className='navigation__link--text'>Home</span>
                      <HomeIcon className="navigation__link--icon logo" />
                    </div>
                  </NavLink>
                </li>
              {navigationItems.map((item, index) => (
                <li className='navigation__item' key={index}>
                  <NavLink className={({ isActive }) =>
                    [
                      isActive || (item.link === '/clubs' && location.pathname.includes('/item')) ? "active" : "",
                      !isLoggedIn && !isVisitor ? "disabled" : "",
                    ].join(" ")}to={item.link} onClick={closeMenu} title={item.name}>
                    <div className="navigation__link">
                      <span className='navigation__link--text'>{item.name}</span>
                      {item.icon}
                    </div>
                  </NavLink>
                </li>
              ))}
              { (isLoggedIn || isVisitor) && <li className='navigation__item'>
                <button type="button" className={`navigation__link ${modalIdOpen === 'profile' ? "active" : ""}`} onClick={profileBtn} title={isLoggedIn ? "Profile" : "Login"}>
                  <div className="navigation__link">
                    <span className='navigation__link--text'>{isLoggedIn ? "PROFILE" : "LOGIN"}</span>
                    <ProfileIcon className="navigation__link--icon logo"/>
                  </div>
                </button>
              </li>
              }
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header;