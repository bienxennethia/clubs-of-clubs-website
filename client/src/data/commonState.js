/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { modals } from '../components/Modal/modals';
import { getClubs, getClubTypes, saveClubs, getForums, saveForum, updateForum, deleteForum, deleteClub, updateClub } from './utils';
const CommonStateContext = createContext();

export const useCommonState = () => useContext(CommonStateContext);

// Common state provider component
export const CommonStateProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [modalIdOpen, setModalIdOpen] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [clubLists, setClubLists] = useState([]);
  const [clubTypes, setClubTypes] = useState([]);
  const [forumLists, setForumLists] = useState([]);
  const [selectedClubType, setSelectedClubType] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);
  const [response, setResponse] = useState(null);
  const [curricularType, setCurricularType] = useState('all');
  const [interestType, setInterestType] = useState('all');
  const [searchString, setSearchString] = useState('');
  const [modalContentId, setModalContentId] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  useEffect(() => {
    setCurrentPage(location.pathname);

    if (location.pathname.includes('clubs') || location.pathname.includes('item')) {
      fetchClubTypes();
    }

    if (location.pathname.includes('forums')) {
      document.querySelector('.content').classList.add('forums');
      fetchForums();
    } else {
      document.querySelector('.content').classList.remove('forums');
    }

    if (location.pathname.includes('clubs')) {
      fetchClubs({ type: selectedClubType });
    }
  }, [location.pathname, selectedClubType]);

  useEffect(() => {

    if (location.pathname.includes('item')) {
      if (clubLists.length === 0) {
        setWarningMessage('Club not found!');
        navigate('/clubs');
      }
    }
  }, [clubLists]);

  const toggleModal = (modalId) => {
    setModalIdOpen(modalId);
  };

  const addStyling = (isOpen) => {
    
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  };

  const fetchClubs = async (params = null) => {
    try {
      const result = await getClubs(params);
      setClubLists(result);
    } catch (error) {
      console.error('Error fetching clubs:', error);
    }
  };
  
  const fetchClubTypes = async () => {
    try {
      const result = await getClubTypes();
      setClubTypes(result);
    } catch (error) {
      console.error('Error fetching club types:', error);
    }
  };

  const fetchForums = async (params = null) => {
    try {
      const result = await getForums(params);
      setForumLists(result);
    } catch (error) {
      console.error('Error fetching forums:', error);
    }
  };

  useEffect(() => {
    let paramId = null;

    if (location.pathname.includes('item')) {
      paramId = location.pathname.split('/').pop();
      fetchClubs({id: paramId});
      fetchForums({clubId: paramId});
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname.includes('forums')) {
      fetchForums({id: null, interestType, curricularType, searchString});
    }
  }, [interestType, curricularType, searchString, location.pathname]);
  
  useEffect( () => {
    const clubTypeOptions = clubTypes.map(type => {
      if (type.id === 'all') {
        return { ...type, id: '', name: 'Select type' };
      }
      return type;
    });;
    const clubOptions = [{ id: 'all', name: 'Select club', label: 'Select club' }, ...clubLists];

    const getModal = async () => {
      addStyling(true);
      const modal = modals.find((modal) => modal.id === modalIdOpen);
      if (modalIdOpen === 'deleteForum' || modalIdOpen === 'deleteClub') {
        setIsDeleteModal(true);
      } else {
        const updatedFields = await Promise.all(modal.content.fields.map((field) => {
          let newFields = field;
          if (field.type === 'select') {
            if (modalIdOpen === 'login' || modalIdOpen === 'addForum' || modalIdOpen === 'editForum') {
              newFields ={ ...newFields, options: clubOptions };
            } else if (modalIdOpen === 'addClub' || modalIdOpen === 'editClub') {
              newFields = { ...newFields, options: clubTypeOptions };
            }
          }
  
          if (modalIdOpen === 'editForum' || modalIdOpen === 'editClub') {
            const selectedItem = modalIdOpen === 'editForum' ? forumLists.find((forum) => forum.forum_id === modalContentId) : clubLists[0];
            selectedItem[newFields.name] = selectedItem[newFields.name] || null;
            newFields = { ...newFields, value: selectedItem[newFields.name] };
          }
          return newFields;
        }));
        setModalContent({ ...modal, content: { ...modal.content, fields: updatedFields }});
      }
    };

    if (modalIdOpen) {
      getModal();
    }
  }, [clubLists, clubTypes, modalIdOpen, modalContentId, forumLists]);

  
  const toggleSave = async () => {
    const fields = {};
    let isValid = true;
  
    modalContent?.content.fields.forEach(field => {
      const inputElement = document.querySelector(`.fields-modal__input[name="${field.name}"]`);
        if (inputElement) {
        const value = inputElement.value.trim();
        if (inputElement.required && value === '') {
          isValid = false;
          inputElement.classList.add('error');
          return;
        } else {
          fields[field.name] = value;
          inputElement.classList.remove('error');
        }
      }
    });
  
    if (isValid) {
      let results = {} ;
      let isEdit = false;
      if (modalIdOpen === 'addClub') {
        const { result } = await saveClubs(fields);
        results = result;
        setClubLists(result);
      } else if (modalIdOpen === 'editClub') {
        const { result } = await updateClub(modalContentId, fields);
        results = result;
        setClubLists(result);
        isEdit = true;
      } else if (modalIdOpen === 'addForumClub') {
        const paramId = location.pathname.split('/').pop();
        const { result } = await saveForum({...fields, club_id: paramId});
        fetchClubs({id: paramId});
        fetchForums({clubId: paramId});
        results = result;
      }else if (modalIdOpen === 'addForum') {
        const { result } = await saveForum(fields);
        results = result;
        setForumLists(result);
      } else if (modalIdOpen === 'editForum') {
        const { result } = await updateForum(modalContentId, fields);
        results = result;
        setForumLists(result);
        isEdit = true;
      }

      if (results) {
        setResponse(isEdit ? 'Updated successfully!' : 'Saved successfully!');
        clearFields();
      } else {
        setResponse(isEdit ? 'Failed to update.' : 'Failed to save.');
      }
    } else {
      setResponse('Please fill in all required fields.');
    }
  };

  const deleteModal = async () => {
    if (modalIdOpen === 'deleteClub') {
      const { message } = await deleteClub(modalContentId);
      if (message) {
        setWarningMessage(message);
        navigate('/clubs');
      }
    } else if (modalIdOpen === 'deleteForum') {
      const { message } = await deleteForum(modalContentId);
      if (message) {
        setWarningMessage(message);
        fetchForums();
        navigate('/forums');
      }
    }
  };

  const closeModal = () => {
    setResponse(null);
    setIsDeleteModal(false);
    addStyling(false);
    setModalContent(null);
    setModalIdOpen(null);
  };

  const clearFields = () => {
    modalContent?.content.fields.forEach(field => {
      const input = document.querySelector(`.fields-modal__input[name="${field.name}"]`);
      if (input) {
        input.value = '';
      }
  
      const textarea = document.querySelector(`.fields-modal__input[name="${field.name}"]`);
      if (textarea) {
        textarea.value = '';
      }
  
      const select = document.querySelector(`.fields-modal__input[name="${field.name}"]`);
      if (select) {
        select.selectedIndex = 0;
      }
    });
  };

  return (
    <CommonStateContext.Provider value={{ 
      currentPage, setCurrentPage, 
      selectedClub, setSelectedClub,
      modalIdOpen, setModalIdOpen,
      modalContent, setModalContent,
      clubLists, setClubLists,
      clubTypes, setClubTypes,
      forumLists, setForumLists,
      selectedClubType, setSelectedClubType,
      warningMessage, setWarningMessage,
      response, setResponse,
      curricularType, setCurricularType,
      interestType, setInterestType,
      searchString, setSearchString,
      modalContentId, setModalContentId,
      isDeleteModal, setIsDeleteModal,
      toggleModal, closeModal, toggleSave, clearFields, deleteModal }}>
      {children}
    </CommonStateContext.Provider>
  );
};
