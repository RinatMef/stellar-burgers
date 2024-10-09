import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderByNum, orderSelect } from '../../services/slices/orderSlice';
import {
  getIngredients,
  selectedAllIngredients
} from '../../services/slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { AppDispatch } from '../../services/store';

export const OrderInfo: FC = () => {
  const orderData = useSelector(orderSelect);
  const ingredients: TIngredient[] = useSelector(selectedAllIngredients);
  const { number } = useParams();
  const orderNumber = number ? parseInt(number, 10) : undefined;
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getIngredients());
    if (orderNumber) {
      dispatch(getOrderByNum(orderNumber));
    }
  }, [dispatch]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
