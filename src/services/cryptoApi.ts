import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type cryptoResponse = {
  status: string;
  data: {
    stats: {
      total24hVolume: number;
      totalMarketCap: number;
      totalExchanges: number;
      total: number;
      totalMarkets: number;
    };
    coins: {
      uuid: string;
      rank: number;
      change: string;
      marketCap: string;
      price: string;
      iconUrl: string;
      name: string;
    }[];
  };
};

export type cryptoDetailsResponse = {
  data: {
    coin: {
      uuid: string;
      rank: number;
      change: string;
      marketCap: string;
      price: string;
      iconUrl: string;
      name: string;
      description: string;
      "24hVolume": string;
      slug: string;
      allTimeHigh: {
        price: string;
      };
      numberOfMarkets: number;
      numberOfExchanges: number;
      supply: {
        confirmed: boolean;
        circulating: string;
        total: string;
      };
      links: {
        name: string;
        url: string;
        type: string;
      }[];
    };
  };
};

export type coinHistoryResponse = {
  data: {
    change: number;
    history: {
      price: string;
      timestamp: number;
    }[];
  };
};

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "b3ab5e9997mshbc41e81698ee441p1451ffjsn7c43d56ba500",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<cryptoResponse, number>({
      query: (count: number) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<cryptoDetailsResponse, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCoinHistory: builder.query<
      coinHistoryResponse,
      { coinId: string; timePeriod: string }
    >({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCoinHistoryQuery,
} = cryptoApi;
