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
  }),
});

export const { useCreateAppointmentMutation } = appointmentsApiSlice;