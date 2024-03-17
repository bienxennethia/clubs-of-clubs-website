import "./Modal.scss";
const Modal = ({ toggleLoginModal, children }) => {
  return (
    <section className="modal">
      <button onClick={toggleLoginModal} className="modal__close-btn">X</button>
      <div className="modal__container container">
        {children}
      </div>
    </section>
  )
}

export default Modal;