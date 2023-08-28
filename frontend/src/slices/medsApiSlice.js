import { BASE_URL, MEDICINE_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const medsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMedicines: builder.query({
      query: () => ({
        url: MEDICINE_URL,
      }),
      providesTags: ["Medicines"],
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
    updateMedicine: builder.mutation({
      query: (data) => ({
        url: `${MEDICINE_URL}/${data.medId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Medicines"],
    }),
    uploadMedicineImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMedicinesQuery,
  useGetMedicineDetailsQuery,
  useCreateMedicineMutation,
  useUpdateMedicineMutation,
  useUploadMedicineImageMutation,
} = medsApiSlice;
