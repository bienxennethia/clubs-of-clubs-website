import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
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

import LoginModal from './components/LoginModal/LoginModal';
import Modal from './components/Modal/Modal';
function App() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const toggleModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
    
    if (!isLoginModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }

  return (
    <div className={`app ${isLoginModalOpen ? 'app__modal-open' : ''}`}>
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home toggleModal={toggleModal} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/club/:id" element={<Club />} />
        </Routes>
        <div className='content__background'></div>
        <Footer />
      </div>
      
      { isLoginModalOpen && 
        <Modal toggleModal={toggleModal}>
          <LoginModal isLoginModalOpen={isLoginModalOpen}/>
        </Modal> 
      }

      <Button />
    </Router>
    </div>
  );
}

export default App;
