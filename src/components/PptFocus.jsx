// import React from "react";
// import { useParams } from "react-router-dom";

// function PptFocus() {
//   let { participantId } = useParams();

//   return (
//     <div>
//       <h2>Participant Details - {participantId}</h2>
//     </div>
//   );
// }

// export default PptFocus;
import { useParticipants } from "../context/PptContext";
import { useParams } from "react-router-dom";

function PptFocus() {
  const { participants } = useParticipants();
  const { participantId } = useParams();
  const index = parseInt(participantId, 10);
  const participant = participants[index];

  return (
    <div>
      <h2>
        Participant Details - {participant?.firstName} {participant?.lastName}
      </h2>
      <div>Date of Birth: {participant?.dateOfBirth}</div>
      <div>Gender: {participant?.gender}</div>
      <div>Phone Number: {participant?.phoneNumber}</div>
      <ul>
        {participant?.diagnoses.map((diagnosis, index) => (
          <li key={index}>
            {diagnosis.icdCode} -{" "}
            {new Date(diagnosis.timestamp).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PptFocus;
