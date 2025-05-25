import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AssessmentState {
  questions: any[];
  responses: { questionId: string; optionIndex: number }[];
  results: any;
}

const initialState: AssessmentState = {
  questions: [],
  responses: [],
  results: null
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<any[]>) {
      state.questions = action.payload;
    },
    setResponses(state, action: PayloadAction<AssessmentState['responses']>) {
      state.responses = action.payload;
    },
    setResults(state, action: PayloadAction<any>) {
      state.results = action.payload;
    },
    resetAssessment(state) {
      state.responses = [];
      state.results = null;
    }
  }
});

export const { setQuestions, setResponses, setResults, resetAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
