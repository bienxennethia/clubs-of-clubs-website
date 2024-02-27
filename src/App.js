import './App.scss';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Clubs from './components/Clubs/Clubs';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="content">
        <div className='content__background'></div>
        <Hero />
        <About />
        <Clubs/>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
