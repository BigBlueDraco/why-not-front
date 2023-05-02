import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type GradeState = {
  givenId: null | number;
};
const initialState: GradeState = { givenId: null };
const gradeSlice = createSlice({
  name: "grade",
  initialState,
  reducers: {
    changeId(state, action: PayloadAction<number>) {
      state.givenId = action.payload;
    },
    removeId(state) {
      state.givenId = null;
    },
  },
});
export const { changeId, removeId } = gradeSlice.actions;
export const gradeReducer = gradeSlice.reducer;
