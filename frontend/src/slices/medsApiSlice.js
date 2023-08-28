import { BASE_URL, MEDICINE_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const medsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicines: builder.query({
      query: () => ({
        url: MEDICINE_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMedicineDetails: builder.query({
      query: (medId) => ({
        url: `${MEDICINE_URL}/${medId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createMedicine: builder.mutation({
      query: () => ({
        url: `${MEDICINE_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Medicine"],
    }),
  }),
});

export const {
  useGetMedicinesQuery,
  useGetMedicineDetailsQuery,
  useCreateMedicineMutation,
} = medsApiSlice;
