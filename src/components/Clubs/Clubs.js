import React from "react";

import "./Clubs.scss";

// data
import clubs from "./clubs-data";

// image
import { ReactComponent as Arrow } from "../../icons/arrow.svg";

const Clubs = () => {


  return (
    <div className="clubs">
      <div className="clubs__container container">
        {clubs.map((club) => (
          <div className="clubs__column">
            <h2>{club.name}</h2>
            <div className="clubs__items">
              {club.items.map((item) => (
                <div className="clubs__item">
                  <Arrow/>
                  <div className="clubs__text">{item}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
     </div>
  )
}

export default Clubs;