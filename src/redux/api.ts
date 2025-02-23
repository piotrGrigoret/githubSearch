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
          data: { message: 'User not found' } 
        };
      }
      if (response.status === 403) {
        throw { 
          status: 403, 
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
        // Кэшируем по username и странице
        return `${queryArgs.username}-${queryArgs.page}`;
      },
      merge: (currentCache, newItems, { arg: { page } }) => {
        // Если это первая страница, заменяем кэш
        if (page === 1) {
            return newItems;
        }
        // Иначе добавляем новые элементы
        return [...currentCache, ...newItems];
      },
        // Обновляем логику forceRefetch
      forceRefetch: ({ currentArg, previousArg }) => {
          return (
              currentArg?.username !== previousArg?.username ||
              currentArg?.page !== previousArg?.page
          );
      },
      transformResponse: (response: GithubRepo[], meta, arg) => {
        // Если это новый поиск (страница 1), возвращаем только новые данные
        if (arg.page === 1) {
            return response;
        }
        // Иначе возвращаем данные как есть
        return response;
      },
    }),
  }),
});

export const { useGetUserReposQuery } = githubApi;