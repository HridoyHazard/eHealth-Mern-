import { BLOODS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const bloodsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBloods: builder.query({
      query: ({ keyword }) => ({
        url: BLOODS_URL,
        params: {
          keyword,
        },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Bloods"],
    }),
    getBloodDetails: builder.query({
      query: (bloodId) => ({
        url: `${BLOODS_URL}/${bloodId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBlood: builder.mutation({
      query: () => ({
        url: `${BLOODS_URL}`,
        method: "POST",
      }),
      invalidatesTags: ["Blood"],
    }),
    updateBlood: builder.mutation({
      query: (data) => ({
        url: `${BLOODS_URL}/${data.bloodId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bloods"],
    }),
    deleteBlood: builder.mutation({
      query: (bloodId) => ({
        url: `${BLOODS_URL}/${bloodId}`,
        method: "DELETE",
      }),
      providesTags: ["Blood"],
    }),
  }),
});

export const {
  useCreateBloodMutation,
  useGetBloodDetailsQuery,
  useGetBloodsQuery,
  useDeleteBloodMutation,
  useUpdateBloodMutation,
} = bloodsApiSlice;
