import { useLocation } from 'react-router-dom';
import './Button.scss';

import {ReactComponent as Edit } from "../../icons/edit.svg";

const Button = ({toggleModal }) => {
  const location = useLocation();
  
  const toggleButton = () => {
    toggleModal(location.pathname === "/forums" ? "addForum" : "addClub");
  };

  const pathsToShowButton = ["/forums", "/clubs"];

  return (
    pathsToShowButton.includes(location.pathname) &&
    <div className="button" onClick={toggleButton}>
      <Edit />
    </div>
  );
}

export default Button;