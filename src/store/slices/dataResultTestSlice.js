import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuestions: 0,
  correctAnswers: 0,
  newCorrectAnswers: 0,
  submissionScore: 0,
  pointsAdded: 0,
  newStudentScore: 0,
};
const dataResultTest = createSlice({
  name: "dataResultTest",
  initialState,
  reducers: {
    setDataResult: (state, action) => {
      state.totalQuestions = action.payload.totalQuestions;
      state.correctAnswers = action.payload.correctAnswers;
      state.newCorrectAnswers = action.payload.newCorrectAnswers;
      state.submissionScore = action.payload.submissionScore;
      state.pointsAdded = action.payload.pointsAdded;
      state.newStudentScore = action.payload.newStudentScore;
    },
  },
});

export const { setDataResult } = dataResultTest.actions;
export default dataResultTest.reducer;
