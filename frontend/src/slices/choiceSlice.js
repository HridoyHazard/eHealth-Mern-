import { createSlice } from "@reduxjs/toolkit";
import { updateChoice } from "../utils/choiceUtils";

const initialState = localStorage.getItem("choice")
  ? JSON.parse(localStorage.getItem("choice"))
  : { doctorInfo: [], Address: {} };

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
    saveAddress: (state, action) => {
      state.Address = action.payload;
      return updateChoice(state);
    },

    cleardoctorInfo: (state) => {
      state.doctorInfo = [];
      return updateChoice(state);
    },
  },
});
export const { addToChoice, saveAddress, cleardoctorInfo } =
  choiceSlice.actions;
export default choiceSlice.reducer;
