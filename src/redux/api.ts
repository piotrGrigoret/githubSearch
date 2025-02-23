import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GithubRepo, SearchParams } from '../types/github';

const BASE_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const githubApi = createApi({
  reducerPath: 'githubApi',
  
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.github.com/',
    prepareHeaders: (headers) => {
        if (BASE_URL) {
          headers.set('Authorization', `Bearer ${TOKEN}`);
        }
        headers.set('Accept', 'application/vnd.github.v3+json');
        return headers;
    },
    validateStatus: (response) => {

      if (response.status === 404) {
        throw { 
          status: 404, 
          data: { message: 'Пользователь не найден' } 
        };
      }
      if (response.status === 403) {
        throw { 
          status: 403, 
          data: { message: 'Превышен лимит запросов к API (60 в час)' } 
        };
      }
      return response.status === 200;
    }
  }),

  endpoints: (builder) => ({
    getUserRepos: builder.query<GithubRepo[], SearchParams>({
      query: ({ username, page, per_page }) => ({
        url: `users/${username}/repos`,
        params: {
          page,
          per_page,
          sort: 'updated'
        }
      }),

      
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.username;
      },

      // Объединяем результаты для бесконечной прокрутки
      merge: (currentCache, newItems) => {
        if (currentCache) {
          return [...currentCache, ...newItems];
        }
        return newItems;
      },

      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.username !== previousArg?.username ||
          currentArg?.page !== previousArg?.page
        );
      },
    }),
  }),
});

export const { useGetUserReposQuery } = githubApi;