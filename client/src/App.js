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
 } from './components/Button/modals';

function App() {
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  const [location, setLocation] = useState();

  const toggleModal = () => {
    setAdminModalOpen(!isAdminModalOpen);
    isModalOpen(!isAdminModalOpen);
  };

  const isModalOpen = (isOpen) => {
    
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
          <Route path="/" element={<Home toggleModal={toggleModal} setLocation={setLocation} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/item/:id" element={<Club />} />
        </Routes>
        <div className='content__background'></div>
        <Footer />
      </div>

      <Button toggleModal={toggleModal} setLocation={setLocation} />

      {
        // eslint-disable-next-line array-callback-return
        modals.map((modal, index) => {
          if (location && location.includes(modal.path)) {
            return (
            <Modal key={index} content={modal.content} toggleModal={toggleModal} isModalOpen={isAdminModalOpen}/>
            )
          }
        })
      }
    </Router>
    </div>
  );
}

export default App;
