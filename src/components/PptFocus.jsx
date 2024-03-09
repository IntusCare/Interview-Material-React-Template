import React, { useEffect, useState } from "react";
import { useParticipants } from "../context/PptContext";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.scss";

function PptFocus() {
  const { participants, diagnosisCache, setDiagnosisCache } = useParticipants();
  const { participantId } = useParams();
  const navigate = useNavigate();
  const index = parseInt(participantId, 10);
  const participant = participants[index];

  const [diagnosesDetails, setDiagnosesDetails] = useState([]);

  useEffect(() => {
    const fetchDiagnosesDetails = async () => {
      let cacheUpdates = {};
      const detailsPromises = participant.diagnoses.map(async (diagnosis) => {
        if (diagnosisCache[diagnosis.icdCode]) {
          return { ...diagnosis, name: diagnosisCache[diagnosis.icdCode] };
        } else {
          const response = await fetch(
            `https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search?sf=code&terms=${diagnosis.icdCode}`
          );
          const data = await response.json();
          if (data[3] && data[3][0]) {
            const name = data[3][0][1];
            cacheUpdates[diagnosis.icdCode] = name;
            setDiagnosisCache((prev) => ({
              ...prev,
              [diagnosis.icdCode]: name,
            }));
            return { ...diagnosis, name };
          } else {
            console.log(
              `Data for code ${diagnosis.icdCode} not found or in unexpected format`,
              data
            );
            return { ...diagnosis, name: "Unknown" };
          }
        }
      });

      const details = await Promise.all(detailsPromises);
      setDiagnosesDetails(details);
      setDiagnosisCache((prev) => ({ ...prev, ...cacheUpdates }));
    };
    if (participant) {
      fetchDiagnosesDetails();
    }
  }, [participant, diagnosisCache, setDiagnosisCache]);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/")}>
        &lt; &nbsp;Back
      </button>
      <div className="ppt-focus-container">
        <div className="participant-details-card">
          <h2>
            {participant?.firstName} {participant?.lastName}
          </h2>
          <div className="separator"></div>
          <div className="subheader">
            <h6>ICD Codes ({diagnosesDetails.length})</h6>
          </div>
          <div className="diagnoses-table">
            {diagnosesDetails.map((diagnosis, index) => (
              <div className="diagnosis-entry" key={index}>
                <span className="disease-name">{diagnosis.name}</span>
                <span className="icd-code">{diagnosis.icdCode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PptFocus;
