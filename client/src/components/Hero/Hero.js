import React from "react";

import "./Hero.scss";

// images
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as HeroImage } from "../../icons/hero.svg";

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero__container">
        <div className="hero__logo">
          <Logo className="logo"/>
        </div>
        <div className="hero__image">
          <HeroImage/>
        </div>
      </div>
     </section>
  )
}

export default Hero;