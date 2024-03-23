import { useLocation } from 'react-router-dom';
import './Button.scss';

import {ReactComponent as Edit } from "../../icons/edit.svg";

const Button = ({toggleModal, setLocation }) => {
  const location = useLocation();
  
  const toggleButton = () => {
    setLocation(location.pathname);
    console.log(location.pathname);
    toggleModal();
  };

  const pathsToShowButton = ["/forums", "/clubs"];

  const isButtonVisible = pathsToShowButton.some(path => {
    const pathRegex = new RegExp(`^${path.replace(/:[^/]+/, '[^/]+')}$`);
    return pathRegex.test(location.pathname);
  });

  return (
    isButtonVisible &&
    <div className="button" onClick={toggleButton}>
      <Edit />
    </div>
  );
}

export default Button;