import './Button.scss';

import React, { useEffect, useState } from 'react';

import {ReactComponent as Edit } from "../../icons/edit.svg";

import { useCommonState } from '../../data/commonState';

const Button = () => {
  const { toggleModal, currentPage } = useCommonState();
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleButton = () => {
    toggleModal(currentPage?.includes("forums") ? "addForum" : currentPage.includes("item") ? "addForumClub" : "addClub");
  };

  useEffect(() => {
    if (currentPage && (currentPage.includes("forums") || currentPage.includes("clubs") || currentPage.includes("item"))) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [currentPage]);

  return (
    isVisible &&
    <div className="button" onClick={toggleButton}>
      <Edit />
    </div>
  );
}

export default Button;