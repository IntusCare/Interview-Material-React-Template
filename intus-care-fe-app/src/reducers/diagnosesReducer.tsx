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

const fetchDiagnosisCodeName = async (searchTerms: string) => {
  try {
    const url = new URL(
      "https://clinicaltables.nlm.nih.gov/api/icd10cm/v3/search"
    );
    url.searchParams.append("maxList", "10");
    url.searchParams.append("sf", "code");
    url.searchParams.append("df", "code,name");
    url.searchParams.append("terms", searchTerms);

    fetch(url, {
      method: "GET",
      // mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
  } catch (e) {
    console.log(e);
  }
};
