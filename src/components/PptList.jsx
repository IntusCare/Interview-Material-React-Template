import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParticipants } from "../context/PptContext";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import filterDownIcon from "../assets/orderFilter_Down.png";
import filterUpIcon from "../assets/orderFilter_Up.png";
import filterAlphaIcon from "../assets/orderFilter_Alpha.png";

function PptList() {
  const { participants } = useParticipants();
  const navigate = useNavigate();
  const [sortedParticipants, setSortedParticipants] = useState([
    ...participants,
  ]);
  const [sortMode, setSortMode] = useState("default");

  useEffect(() => {
    let sortedArray = [...participants];
    if (sortMode === "alphabetical") {
      sortedArray.sort(
        (a, b) =>
          a.firstName.localeCompare(b.firstName) ||
          a.lastName.localeCompare(b.lastName)
      );
    } else if (sortMode === "reverse") {
      sortedArray.reverse();
    }
    setSortedParticipants(sortedArray);
  }, [participants, sortMode]);

  const toggleSort = () => {
    setSortMode((prevMode) => {
      if (prevMode === "default") return "reverse";
      if (prevMode === "reverse") return "alphabetical";
      return "default";
    });
  };

  const sortIcon = () => {
    switch (sortMode) {
      case "reverse":
        return filterUpIcon;
      case "alphabetical":
        return filterAlphaIcon;
      default:
        return filterDownIcon;
    }
  };

  return (
    <div>
      <h2>Participants List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Participant's Name</th>
            <th>
              # of ICD Codes
              <img
                src={sortIcon()}
                alt="Sort"
                onClick={toggleSort}
                className="sort-icon"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedParticipants.map((participant, index) => (
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
