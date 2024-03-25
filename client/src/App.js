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
import { fetchClubTypes, saveClubs, getClubs, updateClub, deleteClub } from './data/utils';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalIdOpen, setModalIdOpen] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [itemId, setItemId] = useState();
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState({});
  const [deleteMessage, setDeleteMessage] = useState('');

  const toggleModal = async (modalId, clubId = null) => {
    setIsModalOpen(!isModalOpen);
    addStyling(!isModalOpen);
    
    if (!modalId) {
      setModalContent(null);
      return;
    }
    setModalIdOpen(modalId);
    
    const modal = modals.find((modal) => modal.id === modalId);
  
    if (modalId === 'addClub' || modalId === 'editClub') {
      try {
        const updatedFields = await Promise.all(modal.content.fields.map(async (field) => { 
          if (field.type === 'select') {
            const options = await fetchClubTypes();

            const updatedOptions = options.map(option => {
              if (option.id === 'all') {
                return { ...option, id: '', name: 'Select type *' };
              }
              return option;
            });
          
            return { ...field, options: updatedOptions };
          }
          return field;
        }));
        const updatedModal = { ...modal, content: { ...modal.content, fields: updatedFields }};

        if (modalId === 'editClub') {
          setItemId(clubId);
          const results = await getClubs(clubId);
          updatedModal.content.fields.map((field) => {
            results[0][field.name] = results[0][field.name] || null;
            field.value = results[0][field.name];
            return field;
          });
          setModalContent({ ...updatedModal, content: { ...updatedModal.content, ...results } });
        } else {
          setModalContent(updatedModal);
        }

      } catch (error) {
        console.error('Error fetching club types:', error);
      }
    } else if (modalId === 'deleteClub') {
      setIsDeleteModal(!isDeleteModal);
      setItemId(clubId);
    } else {
      setModalContent(modal);
    }
  };
  
  const saveModal = async (data) => {
    if (modalIdOpen === 'addClub') {
      try {
        const { result } = await saveClubs(data);
        setClubs(result);
        return result;
      } catch (error) {
        console.error('Error saving clubs:', error);
        return null;
      }
    } else if (modalIdOpen === 'editClub') {
      try {
        const { result } = await updateClub(itemId, data);
        setClub(result);
        return result;
      } catch (error) {
        console.error('Error saving clubs:', error);
        return null;
      }
    }
  };

  const fetchClubs = async () => {
    try {
      const result = await getClubs();
      setClubs(result);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };


  const deleteModal = async () => {
    if (modalIdOpen === 'deleteClub') {
      const { message } = await deleteClub(itemId);
      if (message) {
        setDeleteMessage(message);
        fetchClubs();
      }
    }
  };

  useEffect(() => {
    if (deleteMessage) {
      const timer = setTimeout(() => {
        setDeleteMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [deleteMessage]);

  useEffect(() => {
  
    fetchClubs();
  }, []);
  
  const toggleFilter = async (type) => {

    if (type === 'all') { type = null; }
  
    try {
      const result = await getClubs(null, type);
      setClubs(result);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };
  

  const closeModal = () => {
    setIsModalOpen(false);
    addStyling(false);

    if (isDeleteModal) {
      setIsDeleteModal(false);
    }

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
          <Route path="/clubs" element={<Clubs clubs={clubs} toggleFilter={toggleFilter} deleteMessage={deleteMessage} />} />
          <Route path="/forums" element={<Forums toggleModal={toggleModal} />} />
          <Route path="/item/:id" element={<Club toggleModal={toggleModal} clubData={club} setClub={setClub} setDeleteMessage={setDeleteMessage} />} />
        </Routes>
        <div className='content__background'></div>
        <Footer />
      </div>

      <Button toggleModal={toggleModal}/>

      {
        isModalOpen &&
        <Modal item={modalContent}
          isDeleteModal={isDeleteModal}
          saveModal={saveModal}
          deleteModal={deleteModal}
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          modalIdOpen={modalIdOpen}/>
      }
    </Router>
    </div>
  );
}

export default App;
