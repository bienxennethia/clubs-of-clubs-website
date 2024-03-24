import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import { fetchClubTypes, saveClubs, getClubs } from './data/utils';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [id, setId] = useState();
  const [clubs, setClubs] = useState([]);

  const toggleModal = async (modalId) => {
    setIsModalOpen(!isModalOpen);
    addStyling(!isModalOpen);
    
    if (!modalId) {
      setModalContent(null);
      return;
    }
    setId(modalId);
  
    const modal = modals.find((modal) => modal.id === modalId);
  
    if (modalId === 'addClub' || modalId === 'editClub') {
      try {
        const updatedFields = await Promise.all(modal.content.fields.map(async (field) => { 
          if (field.type === 'select') {
            const options = await fetchClubTypes();

            const updatedOptions = options.map(option => {
              if (option.id === 'all') {
                return { ...option, id: '', name: 'Select type' };
              }
              return option;
            });
          
            return { ...field, options: updatedOptions };
          }
          return field;
        }));
        const updatedModal = { ...modal, content: { ...modal.content, fields: updatedFields }};
        setModalContent(updatedModal);

      } catch (error) {
        console.error('Error fetching club types:', error);
      }
    } else {
      setModalContent(modal);
    }
  };
  
  const saveModal = async (data) => {
    if (id === 'addClub') {
      try {
        const { result } = await saveClubs(data);
        setClubs(result);
        return result;
      } catch (error) {
        console.error('Error saving clubs:', error);
        return null;
      }
    }
  };
  

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const result = await getClubs();
        setClubs(result);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };
  
    fetchClubs();
  }, []);
  
  const toggleFilter = async (id) => {

    if (id === 'all') { id = null; }
  
    try {
      const result = await getClubs(id);
      setClubs(result);
    } catch (error) {
      console.error('Error fetching clubs:', error);
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
          <Route path="/clubs" element={<Clubs clubs={clubs} toggleFilter={toggleFilter} />} />
          <Route path="/forums" element={<Forums toggleModal={toggleModal} />} />
          <Route path="/item/:id" element={<Club toggleModal={toggleModal} />} />
        </Routes>
        <div className='content__background'></div>
        <Footer />
      </div>

      <Button toggleModal={toggleModal}/>

      {
        modalContent && isModalOpen &&
        <Modal item={modalContent}
          saveModal={saveModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}/>
      }
    </Router>
    </div>
  );
}

export default App;
