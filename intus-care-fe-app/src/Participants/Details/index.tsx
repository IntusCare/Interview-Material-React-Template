import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import "./index.scss";
import { FaChevronLeft } from "react-icons/fa";
import {
  IParticipant,
  IDiagnosis,
  setParticipants,
  fetchParticipants,
} from "../../reducers/participantsReducer";
import { IDiagnosisDetails } from "../../reducers/diagnosesReducer";
import { useDispatch, useSelector } from "react-redux";
import { ParticipantsState } from "../../store";

function ParticipantDetails() {
  const { participantId } = useParams();
  const participantIdParam: string = participantId!;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const participantWithId = useSelector((state: ParticipantsState) =>
    state.participantsReducer.participantsWithId.find(
      (p) => p.id === participantId
    )
  );

  const [participantName, setParticipantName] = useState("");
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

  useEffect(() => {
    if (participantWithId === undefined) fetchParticipants(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (participantWithId !== undefined) {
      setParticipantName(
        participantWithId.participant.firstName +
          " " +
          participantWithId.participant.lastName
      );

      const icdCodes = participantWithId.participant.diagnoses.map(
        (d: IDiagnosis) => d.icdCode
      );

      setDiagnosesCodesData(icdCodes);
    }
  }, [participantWithId]);

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
            <h2 className="txt-grayscale-body">{participantName}</h2>
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
