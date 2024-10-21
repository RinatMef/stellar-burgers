import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useLocation, useParams } from 'react-router-dom';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice/ingredientsSlice';
import { TIngredient } from '@utils-types';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  const allIngredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const ingredientData = useSelector(
    (state: RootState) => state.ingredients.selectedIngredient
  );

  useEffect(() => {
    if (location.state?.ingredient) {
      dispatch(setSelectedIngredient(location.state.ingredient));
    } else {
      const selectedIngredient = allIngredients.find(
        (ingredient: TIngredient) => ingredient._id === id
      );
      dispatch(setSelectedIngredient(selectedIngredient || null));
    }
  }, [id, location.state, dispatch, allIngredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
