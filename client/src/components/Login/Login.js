import React from "react";

import "./Login.scss";
import { ReactComponent as Logo } from "../../icons/login.svg";
import { useCommonState } from "../../data/commonState";

const Login = () => {
  const { toggleModal, visitorBtn, isLoggedIn } = useCommonState();

  const handleClick = () => {
    toggleModal('login');
  };

  const handleVisitor = () => {
    visitorBtn();
  };

  return (
    !isLoggedIn && <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1 className="login__title">which are you?</h1>
        </div>
        <div className="login__content">
          <button className="login__action" onClick={() => handleClick('login')}>
            <Logo />
            <span>moderator</span>
          </button>
          <button className="login__action" onClick={() => handleVisitor()}>
            <Logo />
            <span>visitor</span>
          </button>
        </div>
      </div>
     </div>
  )
}

export default Login;