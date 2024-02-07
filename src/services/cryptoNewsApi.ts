import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "X-Api-Key": "cb87876791c74ec38782993ee529a81f",
};

type NewsQueryInput = {
  newsCategory: string;
  count: number;
};

type cryptoNewsType = {
  articles: {
    title: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    description: string;
  }[];
};

const baseUrl = "https://newsapi.org/v2/";

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query<cryptoNewsType, NewsQueryInput>({
      query: ({ newsCategory, count }) =>
        createRequest(`everything?q=${newsCategory}&pageSize=${count}&page=1`),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
