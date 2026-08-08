import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface categories {
  name: string;
}

interface CategoriesState {
  categories: categories[];
  selectedCategory: string;
}

const initialState: CategoriesState = {
  categories: [
    { name: "All" },
    { name: "Coding" },
    { name: "Marketing" },
    { name: "Content Writing" },
    { name: "Email" },
    { name: "Resume" },
    { name: "SQL" },
    { name: "Design" },
    { name: "Social Media" },
    { name: "Productivity" },
    { name: "Others" },
  ],
  selectedCategory: "All",
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;
