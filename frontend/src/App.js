import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/Home";
import Participant from "./components/Participant";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/participant/:participantIdx" element={<Participant />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
