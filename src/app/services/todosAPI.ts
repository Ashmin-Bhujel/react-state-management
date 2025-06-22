import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TodoType {
  id: string;
  content: string;
  done: boolean;
}

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["Todo"],
  endpoints: (build) => ({
    getTodos: build.query<TodoType[], string>({
      query: () => "todos",
      providesTags: ["Todo"],
    }),
    addTodo: build.mutation({
      query: (content) => ({
        url: "todos",
        method: "POST",
        body: {
          id: crypto.randomUUID(),
          content,
          done: false,
        },
      }),
      invalidatesTags: ["Todo"],
    }),
    updateTodo: build.mutation({
      query: ({ id, content }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: {
          content,
        },
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: build.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
    toggleDone: build.mutation({
      query: ({ id, done }) => ({
        url: `todos/${id}`,
        method: "PATCH",
        body: {
          done,
        },
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useToggleDoneMutation,
} = todoAPI;
