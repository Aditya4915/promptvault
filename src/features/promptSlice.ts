import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getPrompts, createPrompt,updatePrompt, deletePromptApi,} from "../api/promptApi";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  favorite: boolean;
  pinned: boolean;
}

interface PromptState {
  prompts: Prompt[];
  searchText: string;
  loading: boolean;
  error: string | null;
}

const initialState: PromptState = {
  prompts: [],
  searchText: "",
  loading: false,
  error: null,
};


// GET prompts
export const fetchPrompts = createAsyncThunk(
  "prompts/fetchPrompts",
  async () => {
    const response = await getPrompts();

    return response.data;
  },
);


// POST prompt
export const addPromptToBackend = createAsyncThunk(
  "prompts/addPromptToBackend",
  async (prompt: Omit<Prompt, "id">) => {
    const response = await createPrompt(prompt);

    return {
      ...prompt,
      id: response.id,
    };
  },
);


// UPDATE Favorite
export const toggleFavoriteBackend = createAsyncThunk(
  "prompts/toggleFavoriteBackend",
  async (prompt: Prompt) => {
    const newFavorite = !prompt.favorite;

    await updatePrompt(prompt.id, {
      favorite: newFavorite,
    });

    return {
      id: prompt.id,
      favorite: newFavorite,
    };
  },
);


// UPDATE Pin
export const togglePinBackend = createAsyncThunk(
  "prompts/togglePinBackend",
  async (prompt: Prompt) => {
    const newPinned = !prompt.pinned;

    await updatePrompt(prompt.id, {
      pinned: newPinned,
    });

    return {
      id: prompt.id,
      pinned: newPinned,
    };
  },
);


// UPDATE prompt
export const updatePromptBackend = createAsyncThunk(
  "prompts/updatePromptBackend",
  async ({
    id,
    data,
  }: {
    id: string;
    data: {
      title?: string;
      description?: string;
      category?: string;
      favorite?: boolean;
      pinned?: boolean;
    };
  }) => {
    await updatePrompt(id, data);

    return {
      id,
      data,
    };
  },
);


// DELETE prompt
export const deletePromptFromBackend = createAsyncThunk(
  "prompts/deletePromptFromBackend",
  async (id: string) => {
    await deletePromptApi(id);

    return id;
  },
);


const promptSlice = createSlice({
  name: "prompts",
  initialState,

  reducers: {
    handleSearchText: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.searchText = action.payload;
    },
  },


  extraReducers: (builder) => 
  {
    builder

      // =========================
      // GET
      // =========================

      .addCase(fetchPrompts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPrompts.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts = action.payload;
      })

      .addCase(fetchPrompts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch prompts";
      })


      // =========================
      // POST
      // =========================

      .addCase(addPromptToBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addPromptToBackend.fulfilled, (state, action) => {
        state.loading = false;
        state.prompts.push(action.payload);
      })

      .addCase(addPromptToBackend.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to add prompt";
      })


      // =========================
      // FAVORITE
      // =========================

      .addCase(
        toggleFavoriteBackend.fulfilled,
        (state, action) => {
          const prompt = state.prompts.find(
            (prompt) => prompt.id === action.payload.id,
          );

          if (prompt) {
            prompt.favorite = action.payload.favorite;
          }
        },
      )

      .addCase(
        toggleFavoriteBackend.rejected,
        (state, action) => {
          state.error =
            action.error.message ||
            "Failed to update favorite";
        },
      )


      // =========================
      // PIN
      // =========================

      .addCase(
        togglePinBackend.fulfilled,
        (state, action) => {
          const prompt = state.prompts.find(
            (prompt) => prompt.id === action.payload.id,
          );

          if (prompt) {
            prompt.pinned = action.payload.pinned;
          }
        },
      )

      .addCase(
        togglePinBackend.rejected,
        (state, action) => {
          state.error =
            action.error.message ||
            "Failed to update pin";
        },
      )


      // =========================
      // DELETE
      // =========================

      .addCase(
        deletePromptFromBackend.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        },
      )

      .addCase(
        deletePromptFromBackend.fulfilled,
        (state, action) => {
          state.loading = false;

          state.prompts = state.prompts.filter(
            (prompt) => prompt.id !== action.payload,
          );
        },
      )

      .addCase(
        deletePromptFromBackend.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.error.message ||
            "Failed to delete prompt";
        },
      )

      // =========================
      // UPDATE
      // =========================

      .addCase(updatePromptBackend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePromptBackend.fulfilled, (state, action) => {
        state.loading = false;

        const prompt = state.prompts.find(
          (prompt) => prompt.id === action.payload.id
        );

        if (prompt) {
          Object.assign(prompt, action.payload.data);
        }
      })

      .addCase(updatePromptBackend.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.error.message || "Failed to update prompt";
      })
        },
      });


export const {
  handleSearchText,
} = promptSlice.actions;

export default promptSlice.reducer;