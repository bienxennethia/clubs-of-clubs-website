import React from "react";

import "./LoginModal.scss";

import { ReactComponent as Logo } from "../../icons/logo.svg";
import { fields } from "./fields";

const LoginModal = ({ isLoginModalOpen}) => {


  return (
    <div className={'login-modal ' + (isLoginModalOpen ? 'open' : '')}>
      <div className="login-modal__container">
        <div className="login-modal__logo">
          <Logo className="logo"/>
        </div>
        <div className="login-modal__content">
          <div className="login-modal__header">
            <h1 className="login-modal__title">LOG IN</h1>
            <h6 className="login-modal__subtitle">as MODERATOR</h6>
            <p className="login-modal__description">I. As a MODERATOR, you have access to posting on the forums for the VISITORs to see</p>
          </div>
          <div className="login-modal__fields fields">
          {fields.map((field) => (
            <div className="login-modal__field field" key={field.label}>
              <label className="login-modal__label select">
                {field.label} <span>({field.placeholder})</span>
              </label>
              {field.type === "select" && (
                <select className="login-modal__input" required name="club">
                  {field.options.map((option, index) => (
                    <option key={index} className="login-modal__input">
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "email" && (
                <input className="login-modal__input" type="text" name="email"/>
              )}
              {field.type === "password" && (
                <input className="login-modal__input" type="password" name="password"/>
              )}
            </div>
          ))}
        </div>
      </div>
     </div>
    </div>
  )
};

export default LoginModal;