import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

interface IngredientState {
  items: Array<TIngredient>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedIngredient: TIngredient | null;
}

const initialState: IngredientState = {
  items: [],
  status: 'idle',
  error: null,
  selectedIngredient: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setSelectedIngredient: (
      state,
      action: PayloadAction<TIngredient | null>
    ) => {
      state.selectedIngredient = action.payload;
    },
    clearSelectedIngredient: (state) => {
      state.selectedIngredient = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      });
  }
});

export const { setSelectedIngredient, clearSelectedIngredient } =
  ingredientsSlice.actions;

export const selectedAllIngredients = (state: RootState) =>
  state.ingredients.items;

export const selectedIngredient = (state: RootState) =>
  state.ingredients.selectedIngredient;

// Экспорт редьюсера по умолчанию
export default ingredientsSlice.reducer;
