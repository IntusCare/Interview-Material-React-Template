import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./index.scss";
import { FaChevronLeft } from "react-icons/fa";
import { IParticipant, IDiagnosis } from "../../reducers/participantsReducer";
import { IDiagnosisDetails } from "../../reducers/diagnosesReducer";

function ParticipantDetails() {
  const { participantId } = useParams();
  const participantIdParam: string = participantId!;
  const navigate = useNavigate();

  const [diagnosesDetails, setDiagnosesCodes] = useState(
    [] as IDiagnosisDetails[]
  );

  function setDiagnosesCodesData(codes: string[]) {
    const displayData = codes.map((code) => {
      const diagnosticDetails: IDiagnosisDetails = {
        icdCode: code,
        name: "Loading...",
      };

      return diagnosticDetails;
    });

    setDiagnosesCodes(displayData);
  }

  const nthElement = (participants: IParticipant[], i = 0) => {
    return participants[i];
  };

  const api_getParticipant = async () => {
    try {
      fetch("http://localhost:8000/participants", {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          const participantData = nthElement(
            data,
            parseInt(participantIdParam)
          );
          const icdCodes = participantData.diagnoses.map(
            (d: IDiagnosis) => d.icdCode
          );
          setDiagnosesCodesData(icdCodes);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    api_getParticipant();
  }, []);

  const api_getDiagnosisCodeName = async (searchTerms: string) => {
    try {
      const url = new URL(
        "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search"
      );
      url.searchParams.append("maxList", "10");
      url.searchParams.append("sf", "code");
      url.searchParams.append("df", "code,name");
      url.searchParams.append("terms", searchTerms);

      fetch(url, {
        method: "GET",
        // mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          return data;
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="row pt-3">
        <div className="col-2">
          <Button
            className="btn-back mt-3 ms-4"
            onClick={() => navigate(`/Participants`)}
          >
            <div className="d-flex justify-content-center align-items-center px-2">
              <FaChevronLeft className="me-2" /> Back
            </div>
          </Button>
        </div>
        <div className="col-8">
          <Card className="icCard">
            <h2 className="txt-grayscale-body">Participant Name</h2>
            <hr className="mt-0" />
            <div>
              <div className="txt-grayscale-labels mb-2">
                ICD Codes ({diagnosesDetails.length})
              </div>
              <div>
                <ul className="list-group ic-icd-code-ul">
                  {diagnosesDetails.map((codeDetails) => (
                    <li className="list-group-item ic-icd-code-li d-inline-flex">
                      <div className="txt-grayscale-black">
                        {codeDetails.name}
                      </div>
                      <div className="txt-grayscale-body ms-auto">
                        {codeDetails.icdCode}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default ParticipantDetails;
