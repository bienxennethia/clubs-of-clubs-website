import React, { useState } from "react";
import Hero from "../components/Hero/Hero";
import Login from "../components/Login/Login";
import LoginModal from "../components/LoginModal/LoginModal";

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const toggleLoginModal = () => {
    console.log(isLoginModalOpen);
    setLoginModalOpen(!isLoginModalOpen);
  }
  return (
    <section className="home">
      <div className="home__container container">
        <Hero/>
        <Login isLoginModalOpen={isLoginModalOpen} toggleLoginModal={toggleLoginModal}/>
        <LoginModal isLoginModalOpen={isLoginModalOpen}/>
      </div>
    </section>
  )
};

export default Home;