import Hero from "../components/Hero/Hero";
import Login from "../components/Login/Login";
import { useEffect } from "react";

const Home = ({ toggleModal, setCurrentPage = null }) => {

  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage('home');
    }
  }, [setCurrentPage]);

  return (
    <section className="home">
      <div className="home__container container">
        <Hero/>
        <Login toggleModal={toggleModal}/>
      </div>
    </section>
  )
};

export default Home;