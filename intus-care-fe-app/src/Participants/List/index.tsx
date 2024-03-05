import { Button, Card } from "react-bootstrap";
import "./index.scss";
import { useState } from "react";

function ParticipantsList() {
  const [filterAscending, setFilterAscending] = useState(false);
  function setAscending(val: boolean) {
    setFilterAscending(val);
  }

  return (
    <>
      <h2>Participants</h2>
      <Card className="ic-card">
        <div className="row">
          <div className="col-8">Participant Name</div>
          <div className="col-4">
            <div className="d-inline-block">ICD Codes</div>
            <div className="d-inline-block ms-1">
              {filterAscending && (
                <Button
                  className="btn-filter"
                  onClick={() => setAscending(false)}
                >
                  <img
                    alt=""
                    src="/intus-care-assets/orderFilter_Down.svg"
                    className="d-inline-block align-center img-rotate-180"
                  />
                </Button>
              )}
              {!filterAscending && (
                <Button
                  className="btn-filter"
                  onClick={() => setAscending(true)}
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
      </Card>
    </>
  );
}

export default ParticipantsList;
