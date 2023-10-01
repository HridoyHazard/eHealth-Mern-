import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";
import choiceSliceReducer from "./slices/choiceSlice.js";

const store = configureStore(
  {
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartSliceReducer,
      auth: authSliceReducer,
      choice: choiceSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  },
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
