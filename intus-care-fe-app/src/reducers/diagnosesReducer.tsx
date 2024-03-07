import { Dispatch, UnknownAction, createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";

enableMapSet();

export interface IDiagnosisDetails {
  icdCode: string;
  name: string | null;
}
const diagnosticDetailsInit: { [code: string]: string } = {};
const initialState = {
  diagnosisDetails: diagnosticDetailsInit,
};
const diagnosisSlice = createSlice({
  name: "diagnoses",
  initialState,
  reducers: {
    setCodeName: (state, action) => {
      state.diagnosisDetails[action.payload.code] = action.payload.name;
    },
  },
});

export const { setCodeName } = diagnosisSlice.actions;
export default diagnosisSlice.reducer;

export const fetchDiagnosisCodeName = async (
  dispatch: Dispatch<UnknownAction>,
  code: string
) => {
  try {
    const url = new URL(
      "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search"
    );
    url.searchParams.append("maxList", "10");
    url.searchParams.append("sf", "code");
    url.searchParams.append("df", "code,name");
    url.searchParams.append("terms", code);

    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data[3].length > 0) {
          const name = data[3][0][1];
          dispatch(setCodeName({ code, name }));
        }
      });
  } catch (e) {
    console.log(e);
  }
};
