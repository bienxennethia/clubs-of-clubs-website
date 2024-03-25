import About from "../components/About/About";
import Creators from "../components/Creators/Creators";

import { useEffect } from "react";

const AboutUs = ({setCurrentPage}) => {

  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage('about');
    }
  }, [setCurrentPage]);

  return (
    <section className="about-us">
      <div className="about-us__container container">
        <About />
        <Creators />
      </div>
    </section>
  )
};

export default AboutUs;