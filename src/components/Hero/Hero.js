import React from "react";

import "./Hero.scss";

// images
import { ReactComponent as Logo } from "../../icons/logo.svg";

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__image">
          <Logo className="hero__logo logo"/>
        </div>
        <div className="hero__text">
          <h1 className="hero__title">Clubs of Cubs</h1>
          <div className="hero__subtext">
            <span className="hero__caption">Roar to Soar:</span>
            <span className="hero__subcaption">where information</span>
            <span className="hero__subcaption">meets inspiration</span>
          </div>
        </div>
      </div>
     </section>
  )
}

export default Hero;