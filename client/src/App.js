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
import { fetchClubTypes, saveClubs, getClubs, updateClub, deleteClub, getForums, saveForum, updateForum, deleteForum } from './data/utils';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState();
  const [modalIdOpen, setModalIdOpen] = useState();
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [itemId, setItemId] = useState();
  const [clubs, setClubs] = useState([]);
  const [club, setClub] = useState({});
  const [deleteMessage, setDeleteMessage] = useState('');
  const [forums, setForums] = useState([]);
  const [clubTypes, setClubTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState('');
  const [searchString, setSearchString] = useState('');
  const [interestType, setInterestType] = useState('');
  const [curricularType, setCurricularType] = useState('');
  const [clubType, setClubType] = useState('');
  const [clubId, setClubId] = useState('');

  const toggleModal = async (modalId, paramId = null) => {
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

            const updatedOptions = clubTypes.map(type => {
              if (type.id === 'all') {
                return { ...type, id: '', name: 'Select type' };
              }
              return type;
            });
          
            return { ...field, options: updatedOptions };
          }
          return field;
        }));
        const updatedModal = { ...modal, content: { ...modal.content, fields: updatedFields }};

        if (modalId === 'editClub') {
          setItemId(paramId);
          const results = await getClubs(paramId);
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
    } else if (modalId === 'addForum' || modalId === 'editForum') {
      try {
        const updatedFields = await Promise.all(modal.content.fields.map(async (field) => { 
          if (field.type === 'select') {
            const options = await getClubs();

            const selectClubOption = { id: '', name: 'Select club' };
            
            const updatedOptions = [selectClubOption, ...options];
            
            return { ...field, options: updatedOptions };
          }
          return field;
        }));
        const updatedModal = { ...modal, content: { ...modal.content, fields: updatedFields }};

        if (modalId === 'editForum') {
          setItemId(paramId);
          const results = await getForums(paramId);
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
        console.error('Error fetching clubs:', error);
      }
    } else if (modalId === 'deleteClub' || modalId === 'deleteForum') {
      setIsDeleteModal(!isDeleteModal);
      setItemId(paramId);
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
    } else if (modalIdOpen === 'addForum') {
      try {
        const { result } = await saveForum(data);
        setForums(result);
        return result;
      } catch (error) {
        console.error('Error saving forum:', error);
        return null;
      }
    } else if (modalIdOpen === 'editForum') {
      try {
        const { result } = await updateForum(itemId, data);
        setForums(result);
        fetchClubs();
        return result;
      } catch (error) {
        console.error('Error saving forum:', error);
        return null;
      }
    }
  };

  const fetchClubType = async () => {
    try {
      const result = await fetchClubTypes();
      setClubTypes(result);
    } catch (error) {
      console.error('Error fetching clubs:', error);
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

  const fetchForums = async () => {
    try {
      const result = await getForums();
      setForums(result);
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };


  const deleteModal = async () => {
    if (modalIdOpen === 'deleteClub') {
      const { message } = await deleteClub(itemId);
      if (message) {
        setDeleteMessage(message);
        fetchClubs();
      }
    } else if (modalIdOpen === 'deleteForum') {
      const { message } = await deleteForum(itemId);
      if (message) {
        setDeleteMessage(message);
        fetchForums();
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
    fetchClubType();
  }, [currentPage]);
  
  const toggleFilter = async () => {

    if (currentPage === "clubs") {
      try {
        const result = await getClubs(null, clubType);
        setClubs(result);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    } else if (currentPage === "forums" || currentPage === "club") {

      try {
        const result = await getForums(null, interestType, curricularType, searchString, clubId);
        setForums(result);
      } catch (error) {
        console.error('Error fetching forums:', error);
      }
    }
  };
  
  const searchToggle = (stringName) => {
    setSearchString(stringName);
  };
  
  useEffect(() => {
    if (currentPage === "forums") {
      setClubId(null);
      toggleFilter();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString, interestType, curricularType, currentPage]);
  
  useEffect(() => {
    if (currentPage === "clubs" || currentPage === "club") {
      toggleFilter();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clubType, clubId]);

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
      <div className={`content ${currentPage}`}>
        <Routes>
          <Route path="/" element={<Home toggleModal={toggleModal} setCurrentPage={setCurrentPage} />} />
          <Route path="/about" element={<AboutUs setCurrentPage={setCurrentPage} />} />
          <Route path="/clubs" element={<Clubs clubs={clubs} setClubType={setClubType} deleteMessage={deleteMessage} clubTypes={clubTypes} setCurrentPage={setCurrentPage} />} />
          <Route path="/forums" element={<Forums toggleModal={toggleModal} forums={forums} clubs={clubs} setCurrentPage={setCurrentPage} searchToggle={searchToggle} setCurricularType={setCurricularType} setInterestType={setInterestType} />}/>
          <Route path="/item/:id" element={<Club toggleModal={toggleModal} clubData={club} setClub={setClub} setDeleteMessage={setDeleteMessage} setCurrentPage={setCurrentPage} forums={forums} setClubId={setClubId} />} />
        </Routes>
        <div className='content__background'></div>
      </div>
      <Footer />

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
