import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectBun,
  selectIngridients
} from '../../services/slices/constructorSlise/ConstructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  clearOrderModal,
  postOrders
} from '../../services/slices/orderSlice/orderSlice';
import { selectUser } from '../../services/slices/userSlice/userSlice';
import { RootState } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const user = useSelector(selectUser);
  const bun = useSelector(selectBun);
  const ingredients = useSelector(selectIngridients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun,
    ingredients: ingredients || []
  };

  const orderRequest = useSelector((state: RootState) => state.order.isLoading);
  const orderModalData = useSelector((state: RootState) => state.order.order);

  const getIngredientsIds = () => {
    const bunId = constructorItems.bun ? constructorItems.bun._id : '';
    const ingredientsIds = constructorItems.ingredients.map(
      (ingredient) => ingredient._id
    );
    return [bunId, ...ingredientsIds, bunId];
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredientIds = getIngredientsIds();
    dispatch(postOrders(ingredientIds));
    dispatch(clearConstructor());
  };

  const closeOrderModal = () => {
    dispatch(clearOrderModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
