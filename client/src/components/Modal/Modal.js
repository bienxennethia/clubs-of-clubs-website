import "./Modal.scss";
import { useEffect } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as Close } from "../../icons/close.svg";
const Modal = ({ closeModal, isModalOpen, item }) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, closeModal]);

  const clearFields = () => {
    // Assuming each field has a unique name, you can clear the input fields by their name
    item.content.fields.forEach(field => {
      const input = document.querySelector(`input[name="${field.name}"]`);
      if (input) {
        input.value = ''; // Clear input value
      }

      const textarea = document.querySelector(`textarea[name="${field.name}"]`);
      if (textarea) {
        textarea.value = ''; // Clear textarea value
      }

      // Assuming the select element doesn't have a default empty option
      const select = document.querySelector(`select[name="${field.name}"]`);
      if (select) {
        select.selectedIndex = 0; // Reset select to default option
      }
    });
  };


  return (
    isModalOpen && <div className={`modal ${item.class ? item.class : ''}`}>
      <div className="modal__container container">
        <div className="modal__container-content">
          <button onClick={closeModal} className="modal__close-btn"><Close /></button>
          <div className="modal__logo">
            <Logo className="logo"/>
          </div>
          <div className="modal__content">
            <div className="modal__header">
              {
                item.content.title && <h1 className="modal__title">{item.content.title}</h1>
              }
              {
                item.content.subtitle && <p className="modal__subtitle">{item.content.subtitle}</p>
              }
              {
                item.content.description && <p className="modal__description">{item.content.description}</p>
              }
            </div>
            <div className="modal__fields fields">
                {item.content.fields.map((field) => (
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
                        <select className="fields-modal__input" name={field.name} required>
                          {field.options.map((option, index) => (
                            <option key={index} value={option.value} className="fields-modal__input">
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === "file" ? (
                        <input
                          className="fields-modal__input"
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                        />
                      ) : field.type === "textarea" ? (
                        <textarea
                          className="fields-modal__input"
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                        />
                      ) : (
                        <input
                          className="fields-modal__input"
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          required
                        />
                      )
                    }
                  </div>
                ))}
                <div className="modal__actions">
                  <button className="modal__btn">Add</button>
                  <button className="modal__btn" onClick={clearFields}>Clear</button>
                </div>
              </div>
        </div>
          </div>
        </div>
      </div>
  )
}

export default Modal;