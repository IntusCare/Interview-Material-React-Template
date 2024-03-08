import React, { useState, useEffect } from "react";

function PptList() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetch("/api/participants") // Using the proxy to redirect to Express backend
      .then((response) => response.json())
      .then((data) => setParticipants(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h2>Participants List</h2>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            {participant.firstName} {participant.lastName} -{" "}
            {participant.diagnoses.length} codes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PptList;
