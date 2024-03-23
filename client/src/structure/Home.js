import Hero from "../components/Hero/Hero";
import Login from "../components/Login/Login";

const Home = ({ toggleModal, setLocation}) => {
  return (
    <section className="home">
      <div className="home__container container">
        <Hero/>
        <Login toggleModal={toggleModal} setLocation={setLocation}/>
      </div>
    </section>
  )
};

export default Home;