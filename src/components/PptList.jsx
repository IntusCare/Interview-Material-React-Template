import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParticipants } from "../context/PptContext";

function PptList() {
  //   const { participants, setParticipants } = useParticipants();

  //   useEffect(() => {
  //     fetch("/api/participants")
  //       .then((response) => response.json())
  //       .then((data) => setParticipants(data));
  //   }, [setParticipants]);

  //   const [participants, setParticipants] = useState([]);

  //   useEffect(() => {
  //     fetch("/api/participants")
  //       .then((response) => response.json())
  //       .then((data) => setParticipants(data))
  //       .catch((error) => console.error("Error fetching data: ", error));
  //   }, []);

  const { participants } = useParticipants();

  console.log(participants);

  return (
    <div>
      <h2>Participants List</h2>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>
            <Link to={`/participants/${index}`}>
              {" "}
              {participant.firstName} {participant.lastName}
            </Link>
            - {participant.diagnoses.length} codes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PptList;
