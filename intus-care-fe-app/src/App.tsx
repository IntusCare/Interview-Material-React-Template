import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import IntusCareNavbar from "./Navbar";
import ParticipantsContent from "./Participants";

function App() {
  return (
    <>
      <IntusCareNavbar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="Participants" />}></Route>
          <Route
            path="Participants/*"
            element={<ParticipantsContent />}
          ></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
