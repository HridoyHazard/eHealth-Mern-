import { DOCTOR_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const medsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => ({
        url: DOCTOR_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getDoctorDetails: builder.query({
      query: (doctorId) => ({
        url: `${DOCTOR_URL}/${doctorId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createDoctor: builder.mutation({
      query: () => ({
        url: `${DOCTOR_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Doctor"],
    }),
    updateDoctor: builder.mutation({
      query: (data) => ({
        url: `${DOCTOR_URL}/${data.doctorId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),
    deleteDoctor: builder.mutation({
      query: (doctorId) => ({
        url: `${DOCTOR_URL}/${doctorId}`,
        method: "DELETE",
      }),
      providesTags: ["Doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorDetailsQuery,
  useCreateDoctorMutation,
  useDeleteDoctorMutation,
  useUpdateDoctorMutation,
  useUploadDoctorImageMutation,
} = medsApiSlice;
