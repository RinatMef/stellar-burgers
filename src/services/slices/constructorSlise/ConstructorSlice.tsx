import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from '../../store';

interface ConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    // Установка булочки
    setBun: (state, action: PayloadAction<TConstructorIngredient | null>) => {
      state.bun = action.payload;
    },

    // Добавление ингредиента
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient; // Если добавляется булочка, заменяем текущую
      } else {
        state.ingredients.push(ingredient); // Для остальных типов ингредиентов добавляем в массив
      }
    },

    // Удаление ингредиента по id
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    // Очистка конструктора
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    },

    // Перемещение ингредиентов
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; option: 'up' | 'down' }>
    ) => {
      const { id, option } = action.payload;
      const index = state.ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );

      switch (option) {
        case 'up':
          if (index > 0) {
            [state.ingredients[index], state.ingredients[index - 1]] = [
              state.ingredients[index - 1],
              state.ingredients[index]
            ];
          }
          break;
        case 'down':
          if (index < state.ingredients.length - 1) {
            [state.ingredients[index], state.ingredients[index + 1]] = [
              state.ingredients[index + 1],
              state.ingredients[index]
            ];
          }
          break;
        default:
          break;
      }
    }
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;

export const selectBurgerConstructorSlice = (state: RootState) =>
  state.burgerConstructor;
export const selectBun = createSelector(
  [selectBurgerConstructorSlice],
  (burgerConstructor) => burgerConstructor.bun
);

export const selectIngridients = createSelector(
  [selectBurgerConstructorSlice],
  (burgerConstructor) => burgerConstructor.ingredients
);
