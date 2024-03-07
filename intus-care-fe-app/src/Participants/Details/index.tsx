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
import {
  IDiagnosisDetails,
  fetchDiagnosisCodeName,
} from "../../reducers/diagnosesReducer";
import { useDispatch, useSelector } from "react-redux";
import { ParticipantsState } from "../../store";
import { Dispatch, UnknownAction } from "redux";

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
  const { diagnosisDetails } = useSelector(
    (state: ParticipantsState) => state.diagnosesReducer
  );

  const [participantName, setParticipantName] = useState("");
  const [diagnosesCodes, setDiagnosesCodes] = useState([] as string[]);

  function setDiagnosesCodesData(codes: string[]) {
    codes.forEach((code) => {
      fetchDiagnosisCodeName(dispatch, code);
    });
    setDiagnosesCodes(codes);
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
                ICD Codes ({diagnosesCodes.length})
              </div>
              <div>
                <ul className="list-group ic-icd-code-ul">
                  {diagnosesCodes.map((code, index) => (
                    <li
                      key={index}
                      className="list-group-item ic-icd-code-li d-inline-flex"
                    >
                      <div className="txt-grayscale-black">
                        {diagnosisDetails[code]}
                      </div>
                      <div className="txt-grayscale-body ms-auto">{code}</div>
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
