import { Routes, Route } from "react-router-dom";
import Content from "../layout/Content";
import ParticipantsList from "./List";
import ParticipantDetails from "./Details";
import { Provider } from "react-redux";
import store from "../store";

function ParticipantsContent() {
  return (
    <>
      <Provider store={store}>
        <Content>
          <Routes>
            <Route path="/" element={<ParticipantsList />}></Route>
            <Route
              path="/:participantId/*"
              element={<ParticipantDetails />}
            ></Route>
          </Routes>
        </Content>
      </Provider>
    </>
  );
}

export default ParticipantsContent;
