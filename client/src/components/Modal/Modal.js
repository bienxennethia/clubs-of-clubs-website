import "./Modal.scss";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as Close } from "../../icons/close.svg";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useNavigate } from "react-router-dom";
const Modal = ({ closeModal, isModalOpen = false, item = null, saveModal = null, deleteModal = null, modalIdOpen = null, isDeleteModal = false }) => {
  const [response, setResponse] = useState('');
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, closeModal]);

  const clearFields = () => {
    item?.content.fields.forEach(field => {
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
  
  
  const toggleSave = async () => {
    const fields = {};
    let isValid = true;
  
    item?.content.fields.forEach(field => {
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
      const results = await saveModal(fields);
      if (results) {
        setResponse('Saved successfully!');
        clearFields();

        if (modalIdOpen === 'editClub') {
          closeModal();
        }
      } else {
        setResponse('Failed to save.');
      }
    } else {
      setResponse('Please fill in all required fields.');
    }
  };

  const toggleDelete = async () => {
    closeModal();
    deleteModal();
    navigate('/clubs');
  };

  return (
    isModalOpen && <div className={`modal ${item?.class ? item?.class : ''} ${isDeleteModal ? 'modal--delete' : ''}`}>
      <div className="modal__container container">
        <div className="modal__container-content">
          <button onClick={closeModal} className="modal__close-btn"><Close /></button>
          <div className="modal__logo">
            <Logo className="logo"/>
          </div>
          {!isDeleteModal &&
            <div className="modal__content">
              <div className="modal__header">
                {
                  item?.content.title && <h1 className="modal__title">{item?.content.title}</h1>
                }
                {
                  item?.content.subtitle && <p className="modal__subtitle">{item?.content.subtitle}</p>
                }
                {
                  item?.content.description && <p className="modal__description">{item?.content.description}</p>
                }
                {
                  item?.id === "addClub" && <p className="modal__description">Note: Officers can be add on the club detail page.</p>
                }
                <p className="modal__description">*required fields</p>
              </div>
              <div className="modal__fields fields">
                  {item?.content.fields.map((field) => (
                    <div className="fields-modal__field field" key={field.name}>
                      {
                        field.label && (
                          <label className="fields-modal__label">{field.label}
                          {
                            field.placeholderText && <span>({field.placeholderText})</span>
                          }</label>
                        )
                      }
                      {
                        field.type === "select" ? (
                          <SelectField field={field} />
                        ) : (
                          <InputField field={field} />
                        )
                      }
                    </div>
                  ))}
                  <div className="modal__footer">
                    <p className="modal__response">{response}</p>
                  </div>
                  <div className="modal__actions">
                    <button className="modal__btn" onClick={toggleSave}>{item?.id.includes('add') ? 'Save' : 'Update'}</button>
                    <button className="modal__btn clear" onClick={clearFields}>Clear</button>
                  </div>
              </div>
            </div>
          }
          {
            isDeleteModal && 
            <div className="modal__content">
              <p>Are you sure you want to delete?</p>
              
              <div className="modal__actions">
                    <button className="modal__btn" onClick={toggleDelete}>Yes</button>
                    <button className="modal__btn clear" onClick={closeModal}>No</button>
                  </div>
            </div>
          }
          </div>
        </div>
      </div>
  )
}

export default Modal;