import React from "react";

import "./About.scss";

// components
import Card from "../Card/Card";

// data
import data from "./data";

const About = () => {

  return (
    <section className="about" id="about">
      <div className="about__container container">
        <h4>IT Research Group 12-Stem3 SY. 2023-2024</h4>
        <div className="about__content">
          {data.map((item) => (
            <Card key={item.key} {...item}></Card>
          ))}
        </div>
      </div>
     </section>
  )
}

export default About;