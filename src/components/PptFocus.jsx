import React, { useEffect, useState } from "react";
import { useParticipants } from "../context/PptContext";
import { useParams } from "react-router-dom";

function PptFocus() {
  const { participants, diagnosisCache, setDiagnosisCache } = useParticipants();
  const { participantId } = useParams();
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

  return (
    <div>
      <h2>
        Participant Details - {participant?.firstName} {participant?.lastName}
      </h2>
      <ul>
        {diagnosesDetails.map((diagnosis, index) => (
          <li key={index}>
            {diagnosis.icdCode} - {diagnosis.name} -{" "}
            {new Date(diagnosis.timestamp).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PptFocus;
