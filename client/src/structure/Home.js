import Hero from "../components/Hero/Hero";
import Login from "../components/Login/Login";

const Home = ({ toggleModal}) => {
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