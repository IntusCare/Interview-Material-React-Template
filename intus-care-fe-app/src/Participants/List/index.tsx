import { Button, Card } from "react-bootstrap";
import "./index.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  setParticipants,
  setParticipantsWithId,
  fetchParticipants,
} from "../../reducers/participantsReducer";
import { useDispatch, useSelector } from "react-redux";
import { ParticipantsState } from "../../store";

function ParticipantsList() {
  const [filterAscendingByDiagnosesCount, setFilterAscendingByDiagnosesCount] =
    useState(false);
  const [filterAscendingByName, setFilterAscendingByName] = useState(false);
  const { participantsWithId } = useSelector(
    (state: ParticipantsState) => state.participantsReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (participantsWithId.length === 0) fetchParticipants(dispatch);
  }, [dispatch]);

  function filterAscendingByDiagnosesCountHandler(val: boolean) {
    setFilterAscendingByDiagnosesCount(val);
    if (participantsWithId.length > 0) {
      const arrayForSort = [...participantsWithId];
      if (val) {
        dispatch(
          setParticipantsWithId(
            arrayForSort.sort((p1, p2) => {
              return (
                p1.participant.diagnoses.length -
                p2.participant.diagnoses.length
              );
            })
          )
        );
      } else {
        dispatch(
          setParticipantsWithId(
            arrayForSort.sort((p1, p2) => {
              return (
                p2.participant.diagnoses.length -
                p1.participant.diagnoses.length
              );
            })
          )
        );
      }
    }
  }

  function filterAscendingByNameHandler(val: boolean) {
    setFilterAscendingByName(val);
    if (participantsWithId.length > 0) {
      const arrayForSort = [...participantsWithId];
      if (val) {
        dispatch(
          setParticipantsWithId(
            arrayForSort.sort(
              (p1, p2) =>
                p1.participant.firstName.localeCompare(
                  p2.participant.firstName
                ) *
                  10 +
                p1.participant.lastName.localeCompare(p2.participant.lastName)
            )
          )
        );
      } else {
        dispatch(
          setParticipantsWithId(
            arrayForSort.sort(
              (p1, p2) =>
                p2.participant.firstName.localeCompare(
                  p1.participant.firstName
                ) *
                  10 +
                p2.participant.lastName.localeCompare(p1.participant.lastName)
            )
          )
        );
      }
    }
  }

  const handleParticipantClick = (participantIndex: string) => {
    navigate(`/Participants/${participantIndex}`);
  };

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
                    onClick={() => filterAscendingByNameHandler(false)}
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
                    onClick={() => filterAscendingByNameHandler(true)}
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
                    onClick={() =>
                      filterAscendingByDiagnosesCountHandler(false)
                    }
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
                    onClick={() => filterAscendingByDiagnosesCountHandler(true)}
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
            {participantsWithId.length > 0 &&
              participantsWithId?.map((p, index) => (
                <li
                  key={p.id}
                  className="list-group-item border-0"
                  onClick={() => handleParticipantClick(p.id)}
                >
                  <Card className="icCard icCardHoverable mx-0 my-0">
                    <div className="row">
                      <div className="col-8">
                        {p.participant.firstName} {p.participant.lastName}
                      </div>
                      <div className="col-4 txt-primary-intusNavy">
                        {p.participant.diagnoses.length}
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
