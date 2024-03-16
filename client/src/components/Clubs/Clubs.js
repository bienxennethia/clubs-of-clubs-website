import React from "react";
import { Link } from "react-router-dom";

import "./Clubs.scss";

// data
import clubs from "./clubs-data";

// use image url
import imageUrl from "../../images/background.jpg";

const Clubs = () => {


  return (
    <section className="clubs">
      <div className="clubs__container container">
        <div className="clubs__header">
          <h2 className="clubs__title">CLUBS</h2>
          <select className="clubs__select" name="club_sort">
            <option className="clubs__option" value="all">All Clubs (Alphabetical)</option>
            <option className="clubs__option" value="curricular">Co-Curricular</option>
            <option className="clubs__option" value="interest">Interest</option>
          </select>
        </div>
        <div className="clubs__content">
          <div className="clubs__items">
            {clubs.map((item) => (
              <Link to="/" className="clubs__item">
                <div className="clubs__item-content" style={{ backgroundImage: `url(${imageUrl})` }}>
                  <div className="clubs__text">{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
     </section>
  )
}

export default Clubs;