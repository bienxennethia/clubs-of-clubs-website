import "./Modal.scss";
import { useEffect } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as Close } from "../../icons/close.svg";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { useCommonState } from "../../data/commonState";
const Modal = () => {
  const { modalIdOpen, modalContent, closeModal, response, toggleSave, clearFields, isDeleteModal, deleteModal } = useCommonState();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const saveModalHandler = () => {
    toggleSave();
  };

  const clearFieldsHandler = () => {
    clearFields();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, closeModal]);

  const toggleDelete = async () => {
    closeModal();
    deleteModal();
  };

  return (
    modalIdOpen && <div className={`modal ${modalContent?.class ? modalContent?.class : ''} ${isDeleteModal ? 'modal--delete' : ''}`}>
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
                  modalContent?.content.title && <h1 className="modal__title">{modalContent?.content.title}</h1>
                }
                {
                  modalContent?.content.subtitle && <p className="modal__subtitle">{modalContent?.content.subtitle}</p>
                }
                {
                  modalContent?.content.description && <p className="modal__description">{modalContent?.content.description}</p>
                }
                {
                  modalContent?.id === "addClub" && <p className="modal__description">Note: Officers can be add on the club detail page.</p>
                }
                <p className="modal__description">*required fields</p>
              </div>
              <div className="modal__fields fields">
                  {modalContent?.content.fields.map((field) => (
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
                    <p className="modal__response">{response?.message}</p>
                  </div>
                  <div className="modal__actions">
                    <button className="modal__btn" onClick={saveModalHandler}>{modalContent?.id.includes('add') ? 'Save' : 'Update'}</button>
                    <button className="modal__btn clear" onClick={clearFieldsHandler}>Clear</button>
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