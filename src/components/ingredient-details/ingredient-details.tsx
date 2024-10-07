import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import {
  selectedAllIngredients,
  setSelectedIngredient
} from '../../services/slices/ingredientsSlice';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Получаем все ингредиенты
  const allIngredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  // Проверяем, есть ли выбранный ингредиент в состоянии Redux
  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  useEffect(() => {
    // Если ingredient передан через state, используем его
    if (location.state?.ingredient) {
      dispatch(setSelectedIngredient(location.state.ingredient));
    } else {
      // Ищем ингредиент по id
      const selectedIngredient = allIngredients.find(
        (ingredient: TIngredient) => ingredient._id === id
      );
      dispatch(setSelectedIngredient(selectedIngredient || null));
    }
  }, [id, location.state, dispatch, allIngredients]);

  // Если ингредиент не найден, показываем загрузчик
  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
