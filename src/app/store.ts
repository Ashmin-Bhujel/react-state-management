import { configureStore } from "@reduxjs/toolkit";
import { todoAPI } from "./services/todosAPI";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [todoAPI.reducerPath]: todoAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoAPI.middleware),
});

setupListeners(store.dispatch);
