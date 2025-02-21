import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { GithubRepo, SearchParams } from '../types/github';



export const githubApi = createApi({
  // Уникальное имя для reducer'а
  reducerPath: 'githubApi',
  
  // Настраиваем базовый URL для всех запросов
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.github.com/',
    prepareHeaders: (headers) => {
        if (GITHUB_TOKEN) {
          headers.set('Authorization', `Bearer ${GITHUB_TOKEN}`);
        }
        headers.set('Accept', 'application/vnd.github.v3+json');
        return headers;
    },
    // Добавляем обработку ошибок
    validateStatus: (response) => {
      // Проверяем статус ответа

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

  // Определяем endpoints (методы API)
  endpoints: (builder) => ({
    // Метод получения репозиториев
    getUserRepos: builder.query<GithubRepo[], SearchParams>({
      // Формируем URL запроса
      query: ({ username, page, per_page }) => ({
        url: `users/${username}/repos`,
        params: {
          page,
          per_page,
          sort: 'updated' // Сортируем по дате обновления
        }
      }),

      // Как кэшировать результаты
      serializeQueryArgs: ({ queryArgs }) => {
        // Кэшируем по username
        return queryArgs.username;
      },

      // Объединяем результаты для бесконечной прокрутки
      merge: (currentCache, newItems) => {
        if (currentCache) {
          // Добавляем новые элементы к существующим
          return [...currentCache, ...newItems];
        }
        return newItems;
      },

      // Когда нужно перезапрашивать данные
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          // Перезапрашиваем если изменился username или номер страницы
          currentArg?.username !== previousArg?.username ||
          currentArg?.page !== previousArg?.page
        );
      },
    }),
  }),
});

// Экспортируем хук для использования в компонентах
export const { useGetUserReposQuery } = githubApi;