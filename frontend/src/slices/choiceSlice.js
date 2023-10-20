import { createSlice } from "@reduxjs/toolkit";
import { updateChoice } from "../utils/choiceUtils";

const initialState = localStorage.getItem("choice")
  ? JSON.parse(localStorage.getItem("choice"))
  : { doctorInfo: [], DateTime: {}, Address: {} };

const choiceSlice = createSlice({
  name: "choice",
  initialState,
  reducers: {
    addToChoice: (state, action) => {
      const item = action.payload;
      const existItem = state.doctorInfo.find((x) => x._id === item._id);
      if (existItem) {
        state.doctorInfo = state.doctorInfo.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.doctorInfo = [...state.doctorInfo, item];
      }
      return updateChoice(state);
    },
    saveDateTime: (state, action) => {
      state.DateTime = action.payload;
      return updateChoice(state);
    },
    saveAddress: (state, action) => {
      state.Address = action.payload;
      return updateChoice(state);
    },
    clearAddress: (state) => {
      state.Address = [];
      return updateChoice(state);
    },
    clearDateNTime: (state) => {
      state.DateTime = [];
      return updateChoice(state);
    },

    cleardoctorInfo: (state) => {
      state.doctorInfo = [];
      return updateChoice(state);
    },
  },
});

export const {
  addToChoice,
  saveDateTime,
  saveAddress,
  clearAddress,
  clearDateNTime,
  cleardoctorInfo,
} = choiceSlice.actions;
export default choiceSlice.reducer;
