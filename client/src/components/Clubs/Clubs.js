import React from "react";
import { Link } from "react-router-dom";

import "./Clubs.scss";

import imageUrl from "../../images/background.jpg";
import SelectField from "../Select/Select";

const Clubs = ({clubs = [], setClubType = null, deleteMessage = null, clubTypes = null}) => {

  return (
    <div className="clubs">
      <div className="clubs__container">
        <div className="clubs__header">
          <h2 className="clubs__title">CLUBS</h2>
          <SelectField setType={setClubType} options={clubTypes} />
        </div>
        <div className="clubs__content">
          { deleteMessage && <div className="clubs__delete-text">{deleteMessage}!</div>}
          { clubs.length === 0 && <div className="clubs__text">No clubs found</div>}
          { clubs.length > 0 && 
            <div className="clubs__items">
              {clubs.map((item) => (
                <Link to={`/item/${item.id}`} className="clubs__item" key={item.id}>
                  <div className="clubs__item-content" style={{ backgroundImage: `url(${imageUrl})` }}>
                    <div className="clubs__text">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          }
        </div>
      </div>
     </div>
  )
}

export default Clubs;