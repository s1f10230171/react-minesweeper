import './App.css';
import Header from './Header';
import Rule from './Rule';
import Game from './Game';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




function App() {
  return(
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/rule" element={<Rule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
