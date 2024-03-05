import { Routes, Route } from "react-router-dom";
import Content from "../layout/Content";
import ParticipantsList from "./List";
import ParticipantDetails from "./Details";

function ParticipantsContent() {
  return (
    <>
      <Content>
        <Routes>
          <Route path="/" element={<ParticipantsList />}></Route>
          <Route
            path="/:participantId/*"
            element={<ParticipantDetails />}
          ></Route>
        </Routes>
      </Content>
    </>
  );
}

export default ParticipantsContent;
