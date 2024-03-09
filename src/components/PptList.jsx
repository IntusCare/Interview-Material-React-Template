import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParticipants } from "../context/PptContext";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import filterDownIcon from "../assets/orderFilter_Down.png";
import filterUpIcon from "../assets/orderFilter_Up.png";

function PptList() {
  const { participants } = useParticipants();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Participants List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Participant's Name</th>
            <th># of ICD Codes</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr
              key={index}
              className="clickable-row"
              onClick={() => navigate(`/participants/${index}`)}
            >
              <td>
                {participant.firstName} {participant.lastName}
              </td>
              <td>{participant.diagnoses.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PptList;
