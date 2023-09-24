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
    getAppointments: builder.query({
      query: () => ({
        url: APPOINTMENTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    approveAppointment: builder.mutation({
      query: (appointmentId) => ({
        url: `${APPOINTMENTS_URL}/${appointmentId}/approve`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateAppointmentMutation,
  useGetAppointmentDetailsQuery,
  useGetMyAppointmentsQuery,
  useGetAppointmentsQuery,
  useApproveAppointmentMutation,
} = appointmentsApiSlice;
