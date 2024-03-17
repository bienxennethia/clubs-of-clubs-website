import "./Modal.scss";
const Modal = ({ toggleLoginModal, children }) => {
  return (
    <div className="modal">
      <button onClick={toggleLoginModal} className="modal__close-btn">X</button>
      <div className="modal__container container">
        {children}
      </div>
    </div>
  )
}

export default Modal;