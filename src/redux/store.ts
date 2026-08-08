import { configureStore } from "@reduxjs/toolkit";
import promptReducer from '../features/promptSlice'
import categoriesReducer from '../features/categarySlice'

export const store = configureStore({
  reducer: {
    
      prompts:promptReducer,
      categories:categoriesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;