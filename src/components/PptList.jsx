import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParticipants } from "../context/PptContext";
import "./styles.scss";
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
    <div className="ppt-list-container">
      <h2 className="page-title">Participants</h2>
      <div className="participants-list">
        <div className="participant-header">
          <span>Participant's Name</span>
          <span>
            # of ICD Codes
            <img
              src={sortIcon()}
              alt="Sort"
              onClick={toggleSort}
              className="sort-icon"
            />
          </span>
        </div>
        <div className="separator"></div>
        {sortedParticipants.map((participant, index) => (
          <div
            key={index}
            className="participant-row"
            onClick={() => navigate(`/participants/${index}`)}
          >
            <span className="participant-name">
              {participant.firstName} {participant.lastName}
            </span>
            <span className="icd-codes">{participant.diagnoses.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PptList;
