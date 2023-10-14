import { apiSlice } from "./apiSlice";
import { REQUESTS_URL } from "../constants";

export const requestbloodApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (request) => ({
        url: REQUESTS_URL,
        method: "POST",
        body: { ...request },
      }),
    }),
    donorNumber: builder.mutation({
      query: (number) => ({
        url: `${REQUESTS_URL}/available`,
        method: "POST",
        body: { ...number },
      }),
    }),
    getRequestDetails: builder.query({
      query: (id) => ({
        url: `${REQUESTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyRequests: builder.query({
      query: () => ({
        url: `${REQUESTS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getRequests: builder.query({
      query: () => ({
        url: REQUESTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    approveRequest: builder.mutation({
      query: (requestId) => ({
        url: `${REQUESTS_URL}/${requestId}/approve`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetRequestDetailsQuery,
  useGetMyRequestsQuery,
  useGetRequestsQuery,
  useApproveRequestMutation,
  useDonorNumberMutation,
} = requestbloodApiSlice;
