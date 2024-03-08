import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import PptList from "./components/PptList";
import PptFocus from "./components/PptFocus";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<PptList />} />
          <Route path="/participants/:participantId" element={<PptFocus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
