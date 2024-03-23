import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.scss';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Clubs from './structure/Clubs';
import Club from './structure/Club';
import Home from './structure/Home';
import AboutUs from './structure/About-Us';
import Forums from './structure/Forums';
import Button from './components/Button/Button';

import Modal from './components/Modal/Modal';
import { modals
 } from './components/Modal/modals';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();

  const toggleModal = (modalId) => {
    setIsModalOpen(!isModalOpen);
    addStyling(!isModalOpen);
    
    if (modalId) {
      const modal = modals.find((modal) => modal.id === modalId);
      setModalContent(modal);
    } else {
      setModalContent(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    addStyling(false);

    if (modalContent) {
      setModalContent(null);
    }
  };

  const addStyling = (isOpen) => {
    
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

  return (
    <div className="app">
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home toggleModal={toggleModal} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/forums" element={<Forums toggleModal={toggleModal} />} />
          <Route path="/item/:id" element={<Club toggleModal={toggleModal} />} />
        </Routes>
        <div className='content__background'></div>
        <Footer />
      </div>

      <Button toggleModal={toggleModal}/>

      {
        modalContent && isModalOpen &&
        <Modal item={modalContent} closeModal={closeModal} isModalOpen={isModalOpen}/>
      }
    </Router>
    </div>
  );
}

export default App;
