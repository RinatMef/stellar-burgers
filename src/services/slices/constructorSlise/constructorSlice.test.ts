import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setBun,
  clearConstructor
} from './ConstructorSlice';

import {
  ingredientTypeBun,
  ingredientTypeMain,
  ingredientTypeSauce
} from './mocks';
import { expect, test, describe } from '@jest/globals';

describe('Constructor reducer tests', function () {
  const initialState = {
    bun: null,
    ingredients: []
  };

  test('обработка setBun', function () {
    const newState = reducer(initialState, setBun(ingredientTypeBun));

    expect(newState).toEqual({
      bun: ingredientTypeBun,
      ingredients: []
    });
  });

  test('обработка addIngredient', function () {
    const newState = reducer(initialState, addIngredient(ingredientTypeMain));

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeMain]
    });
  });

  test('обработка removeIngredient', function () {
    const stateWithIngredient = {
      bun: null,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };

    const newState = reducer(
      stateWithIngredient,
      removeIngredient(ingredientTypeMain.id)
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeSauce]
    });
  });

  test('обработка moveIngredient', function () {
    const stateWithIngredient = {
      bun: null,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };

    const newState = reducer(
      stateWithIngredient,
      moveIngredient({ id: '3', option: 'down' })
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeSauce, ingredientTypeMain]
    });
  });

  test('обработка moveIngredient', function () {
    const stateWithIngredient = {
      bun: ingredientTypeBun,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };

    const newState = reducer(stateWithIngredient, clearConstructor());

    expect(newState).toEqual({
      bun: null,
      ingredients: []
    });
  });
});
