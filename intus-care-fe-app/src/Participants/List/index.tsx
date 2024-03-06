import { Button, Card } from "react-bootstrap";
import "./index.scss";
import { useState, useEffect } from "react";

interface IDiagnosis {
  icdCode: string;
  timestamp: string;
}

interface IParticipant {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: number;
  patientNotes: string;
  diagnoses: IDiagnosis[];
}

function ParticipantsList() {
  const [filterAscendingByDiagnosesCount, setFilterAscendingByDiagnosesCount] =
    useState(false);
  const [filterAscendingByName, setFilterAscendingByName] = useState(false);

  function setAscendingByDiagnosesCount(val: boolean) {
    setFilterAscendingByDiagnosesCount(val);
    if (val) {
      setParticipants(
        participants.sort((p1, p2) => {
          return p1.diagnoses.length - p2.diagnoses.length;
        })
      );
    } else {
      setParticipants(
        participants.sort((p1, p2) => {
          return p2.diagnoses.length - p1.diagnoses.length;
        })
      );
    }
  }

  function setAscendingByName(val: boolean) {
    setFilterAscendingByName(val);
    if (val) {
      setParticipants(
        participants.sort(
          (p1, p2) =>
            p1.firstName.localeCompare(p2.firstName) * 10 +
            p1.lastName.localeCompare(p2.lastName)
        )
      );
    } else {
      setParticipants(
        participants.sort(
          (p1, p2) =>
            p2.firstName.localeCompare(p1.firstName) * 10 +
            p2.lastName.localeCompare(p1.lastName)
        )
      );
    }
  }

  const [participants, setParticipants] = useState([] as IParticipant[]);

  function setParticipantsData(data: IParticipant[]) {
    console.log(data);
    setParticipants(data);
    console.log("data set");
  }

  const makeApiCall = async () => {
    try {
      fetch("http://localhost:8000/participants", {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((data) => {
          setParticipantsData(data);
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
      <h2 className="txt-primary-intusNavy pt-4 px-5">Participants</h2>
      <div className="mx-5">
        <Card className="icCard participants-card mx-5">
          <div className="row">
            <div className="col-8">
              <div className="d-inline-block">Participant Name</div>
              <div className="d-inline-block ms-1">
                {filterAscendingByName && (
                  <Button
                    className="btn-filter"
                    onClick={() => setAscendingByName(false)}
                  >
                    <img
                      alt=""
                      src="/intus-care-assets/orderFilter_Down.svg"
                      className="d-inline-block align-center img-rotate-180"
                    />
                  </Button>
                )}
                {!filterAscendingByName && (
                  <Button
                    className="btn-filter"
                    onClick={() => setAscendingByName(true)}
                  >
                    <img
                      alt=""
                      src="/intus-care-assets/orderFilter_Up.svg"
                      className="d-inline-block align-center"
                    />
                  </Button>
                )}
              </div>
            </div>
            <div className="col-4">
              <div className="d-inline-block">ICD Codes</div>
              <div className="d-inline-block ms-1">
                {filterAscendingByDiagnosesCount && (
                  <Button
                    className="btn-filter"
                    onClick={() => setAscendingByDiagnosesCount(false)}
                  >
                    <img
                      alt=""
                      src="/intus-care-assets/orderFilter_Down.svg"
                      className="d-inline-block align-center img-rotate-180"
                    />
                  </Button>
                )}
                {!filterAscendingByDiagnosesCount && (
                  <Button
                    className="btn-filter"
                    onClick={() => setAscendingByDiagnosesCount(true)}
                  >
                    <img
                      alt=""
                      src="/intus-care-assets/orderFilter_Up.svg"
                      className="d-inline-block align-center"
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <hr className="mt-1" />
          <ul className="list-group">
            {participants.map((p, index) => (
              <li key={index} className="list-group-item border-0">
                <Card className="icCard icCardHoverable mx-0 my-0">
                  <div className="row">
                    <div className="col-8">
                      {p.firstName} {p.lastName}
                    </div>
                    <div className="col-4 txt-primary-intusNavy">
                      {p.diagnoses.length}
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}

export default ParticipantsList;
