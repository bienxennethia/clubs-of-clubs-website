import React from "react";
import { Link } from "react-router-dom";

import "./Clubs.scss";

import imageUrl from "../../images/background.jpg";
import SelectField from "../Select/Select";

const Clubs = ({clubs = [], toggleFilter}) => {

  return (
    <div className="clubs">
      <div className="clubs__container">
        <div className="clubs__header">
          <h2 className="clubs__title">CLUBS</h2>
          <SelectField toggleFilter={toggleFilter} />
        </div>
        <div className="clubs__content">
          <div className="clubs__items">
            {clubs.map((item) => (
              <Link to={`/item/${item.id}`} className="clubs__item" key={item.id}>
                <div className="clubs__item-content" style={{ backgroundImage: `url(${imageUrl})` }}>
                  <div className="clubs__text">{item.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
     </div>
  )
}

export default Clubs;