import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

import "./Header.scss";

// components
import { ReactComponent as Logo } from "../../icons/logo.svg";


const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll('section');

      setIsSticky(scrollPosition > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };

    // Set initial active section when the component mounts
    const initialActiveSection = document.querySelector('section#hero');
    if (initialActiveSection) {
      setActiveSection('hero');
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="header">
      <div className="header__container">
        {/* <nav className={`navigation ${isSticky ? 'sticky' : ''}`}> */}
        <nav className="navigation">
          <div className="navigation__container">
            <div className="navigation__content">
              <Logo className="navigation__logo logo"></Logo>
              <h2>Clubs for Cubs</h2>
            </div>
            <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
              <li>
                <Link to="hero" smooth={true} duration={500} spy={true} className="active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="about" smooth={true} duration={500} spy={true}>
                  About
                </Link>
              </li>
              <li>
                <Link to="clubs" smooth={true} duration={500} spy={true}>
                  Clubs
                </Link>
              </li>
              <li>
                <Link to="contact-us" smooth={true} duration={500} spy={true}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header;