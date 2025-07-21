// src/api/recipeApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    // Rechercher des recettes par ingrédient
    getMealsByIngredient: builder.query<any, string>({
      query: (ingredient) => `filter.php?i=${ingredient}`,
    }),
    // Obtenir les détails d'une recette par ID
    getMealById: builder.query<any, string>({
      query: (id) => `lookup.php?i=${id}`,
    }),
    // Rechercher des recettes par nom
    searchMealsByName: builder.query<any, string>({
      query: (name) => `search.php?s=${name}`,
    }),
    // Obtenir la liste des ingrédients
    listIngredients: builder.query<any, void>({
      query: () => `list.php?i=list`,
    }),
  }),
});

export const {
  useGetMealsByIngredientQuery,
  useGetMealByIdQuery,
  useSearchMealsByNameQuery,
  useListIngredientsQuery,
  useLazyGetMealsByIngredientQuery,
  useLazyGetMealByIdQuery
} = recipeApi;
