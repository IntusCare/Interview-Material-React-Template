import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IParticipant, IDiagnosis } from "../List";
import "./index.scss";

function ParticipantDetails() {
  const { participantId } = useParams();
  const participantIdParam: string = participantId!;
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(`/Participants`);
  };

  const [participant, setParticipant] = useState<IParticipant | null>(null);
  function setParticipantData(data: IParticipant | null) {
    console.log("participant data: ", data);
    if (data != null) setParticipant(data);
  }

  const nthElement = (participants: IParticipant[], i = 0) => {
    console.log("nth Element finder: ", participants);
    console.log("i: ", i);
    if (i > participants.length - 1) return null;
    return participants[i];
  };

  const makeApiCall = async () => {
    try {
      fetch("http://localhost:8000/participants", {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("API data: ", data);
          console.log("API participantId: ", participantId);
          const participantData = nthElement(
            data,
            parseInt(participantIdParam)
          );
          console.log("participant data: ", participantData);
          setParticipantData(participantData);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    makeApiCall();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-2">
          <Button className="btn-back mt-3 ms-3" onClick={handleBackClick}>
            Back
          </Button>
        </div>
        <div className="col-8">
          <Card className="icCard">
            <h2 className="txt-grayscale-body">Participant Name</h2>
            <hr className="mt-0" />
            <div>
              <div className="txt-grayscale-labels mb-2">
                ICD Codes ({participant?.diagnoses.length})
              </div>
              <div>
                <ul className="list-group ic-icd-code-ul">
                  {participant?.diagnoses.map((d) => (
                    <li className="list-group-item ic-icd-code-li d-inline-flex">
                      <div className="txt-grayscale-black">{d.icdCode}</div>
                      <div className="txt-grayscale-body ms-auto">
                        {d.icdCode}
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
