import Hero from "../components/Hero/Hero";
import Login from "../components/Login/Login";

const Home = ({ toggleLoginModal}) => {
  return (
    <section className="home">
      <div className="home__container container">
        <Hero/>
        <Login toggleLoginModal={toggleLoginModal}/>
      </div>
    </section>
  )
};

export default Home;