import { createSlice } from "@reduxjs/toolkit";

export interface IDiagnosisDetails {
  icdCode: string;
  name: string | null;
}

const initialState = {
  diagnosisDetails: [] as IDiagnosisDetails[],
};
const diagnosisSlice = createSlice({
  name: "diagnoses",
  initialState,
  reducers: {},
});

export default diagnosisSlice.reducer;
