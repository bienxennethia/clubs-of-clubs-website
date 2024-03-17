import "./Modal.scss";
const Modal = ({ toggleModal, children }) => {
  return (
    <div className="modal">
      <button onClick={toggleModal} className="modal__close-btn">X</button>
      <div className="modal__container container">
        {children}
      </div>
    </div>
  )
}

export default Modal;