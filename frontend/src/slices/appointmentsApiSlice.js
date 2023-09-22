import { apiSlice } from "./apiSlice";
import { APPOINTMENTS_URL } from "../constants";

export const appointmentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (appointment) => ({
        url: APPOINTMENTS_URL,
        method: "POST",
        body: { ...appointment },
      }),
    }),
    getAppointmentDetails: builder.query({
      query: (id) => ({
        url: `${APPOINTMENTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyAppointments: builder.query({
      query: () => ({
        url: `${APPOINTMENTS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentDetailsQuery,
  useGetMyAppointmentsQuery,
} = appointmentsApiSlice;
