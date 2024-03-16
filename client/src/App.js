import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import './App.scss';

// components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Clubs from './components/Clubs/Clubs';
import Home from './structure/Home';
import AboutUs from './structure/About-Us';
import Forums from './structure/Forums';


function App() {

  return (
    <div className="App">
    <Router>
      <div>
        <Header />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/forums" element={<Forums />} />
          </Routes>
          <div className='content__background'></div>
          <Footer />
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;
