import { configureStore } from "@reduxjs/toolkit";
import { gradeReducer } from "./gradeSlice";

export const store = configureStore({
  reducer: {
    grade: gradeReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
