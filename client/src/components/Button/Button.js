import React, { useState } from 'react';
import './Button.scss';

import {ReactComponent as Edit } from "../../icons/edit.svg";
import Modal from "../Modal/Modal";
import LoginModal from "../LoginModal/LoginModal";


const Button = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleButton = () => {
    setModalOpen(!isModalOpen);
  }
  return (
    <div className="button" >
      <Edit onClick={toggleButton} />

      {isModalOpen && (
        <Modal toggleModal={toggleButton}>
          <LoginModal />
        </Modal>
      )}
    </div>
  );
}

export default Button;