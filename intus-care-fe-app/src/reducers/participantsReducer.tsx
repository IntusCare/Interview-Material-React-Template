import { Dispatch, UnknownAction, createSlice } from "@reduxjs/toolkit";

export interface IDiagnosis {
  icdCode: string;
  timestamp: string;
}

export interface IParticipant {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: number;
  patientNotes: string;
  diagnoses: IDiagnosis[];
}

export interface IParticipantWithId {
  id: string;
  participant: IParticipant;
}

const initialState = {
  participantsWithId: [] as IParticipantWithId[],
};
const participantsSlice = createSlice({
  name: "participants",
  initialState,
  reducers: {
    setParticipants: (state, action) => {
      state.participantsWithId = action.payload.map(
        (participant: IParticipant, index: number) => {
          const participantWithId: IParticipantWithId = {
            id: index.toString(),
            participant: participant,
          };

          return participantWithId;
        }
      );
    },
    setParticipantsWithId: (state, action) => {
      state.participantsWithId = action.payload;
    },
  },
});

export const { setParticipants, setParticipantsWithId } =
  participantsSlice.actions;
export default participantsSlice.reducer;

export const fetchParticipants = async (dispatch: Dispatch<UnknownAction>) => {
  try {
    const response = await fetch("http://localhost:8000/participants", {
      method: "GET",
      mode: "cors",
    });
    const data = await response.json();
    dispatch(setParticipants(data));
  } catch (error) {
    console.error("Fetch error:", error);
  }
};
