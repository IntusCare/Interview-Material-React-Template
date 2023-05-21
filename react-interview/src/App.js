import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

import ParticipantsPage from './ParticipantsPage';
import IndividualParticipantPage from './IndividualParticipantPage';

function App() {


  //If each participant had a unique identifiable ID in the data, I would configure this differently where on the IndividualParticipantPage it would either use a lookup on the client-side or do another server call
  //But instead the participant URL will be using the index number, so depending on the sorting method an individual participant's id for the URL will change
  //I could've assigned a unique ID on the client-side on run-time, but that would be more code and processing power, in the real-world they'd just come with a unique id in the data and that would be used
  //I could've also looked up the participant by name, but I deemed it unsafe or unreliable due to the possibility of multiple participants with the same name.
  //Without a proper id, if you sort the list and go to the URL in another tab, it would give you the wrong participant.
  //A proper solution would be a data improvement where the participant has an ID, which I gave it in api\data.js but I didn't use since I don't know if that's within the scope of this assessment.
  //The next best solution is to assign it an ID on the client-side, but that would seem to be beyond the scope of this assessment.
  //And then there's a partial-safety solution, which I went with, where I also have the patient's name in the URL, and if the particpant's name doesn't match the one in the URL then redirect to the homepage.

  //I put this state instead of the ParticipantsPage so that the data can be accessed in both ParticipantsPage and IndividualParticipantPage
  const [participants, setParticipants] = useState([]);
  
  //I put these two states here so the direction of the filter icon is preserved when navigating away and coming back 
  const [nameAlphabeticalSort, setNameAlphabeticalSort] = useState(null); //Three states, true, false, null
  const [largestOrder, setLargestOrder] = useState(true);                 //Three states, true, false, null

  const fetchParticipants = async () => {
    let participantsResponse = null;
    try {
      let response = await fetch('http://localhost:5000/participants', { method: "GET" });
      participantsResponse = await response.json();
      participantsResponse.sort((a, b) => { return b.diagnoses.length - a.diagnoses.length });
    } catch (e) {

    }
    setParticipants(participantsResponse);
    //return participantsResponse;
  }

  //I put this useEffect here instead of in the ParticipantsPage so that it wouldn't load the participants again when the ParticipantsPage component unmounts. Which would be another API call, and the order would be different without another state to keep track of the preferred order. Also the possibility in the future if the function returns a slightly different set of participants.
  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="App">
      <Container className="App-container vh-100 d-flex flex-column p-0">
        <Navbar>
          <Container className="NavBar-container">
            <img src="/logo_IntusCare.png" alt="Intus Care" />
          </Container>
        </Navbar>
        <Row className="App-body h-100 g-0">
          <Router>
            <Routes>
              <Route path=""
                element={<ParticipantsPage participants={participants} setParticipants={setParticipants}
                  nameAlphabeticalSort={nameAlphabeticalSort} setNameAlphabeticalSort={setNameAlphabeticalSort} largestOrder={largestOrder} setLargestOrder={setLargestOrder}
                />}
              />
              <Route path="/participant/:participantid?/:participantname?" element={<IndividualParticipantPage participants={participants} />}>
              </Route>
            </Routes>
          </Router>
        </Row>
      </Container>
    </div>
  );
}

export default App;