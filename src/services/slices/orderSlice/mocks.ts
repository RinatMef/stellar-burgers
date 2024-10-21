import { TNewOrderResponse } from '@api';
import { TOrder } from '@utils-types';

interface IOrderState {
  success: boolean;
  order: TOrder | null;
  userOrder: TOrder[] | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IOrderState = {
  success: false,
  order: null,
  userOrder: null,
  name: null,
  isLoading: false,
  error: null
};

export const mockedOrderDetails = {
  orders: [
    {
      _id: '123',
      ingredients: ['643d69a5c3f7b9001cfa0947', '643d69a5c3f7b9001cfa0940'],
      status: 'done',
      name: 'Краторный бессмертный фалленианский метеоритный бургер',
      createdAt: '2024-10-19T23:24:13.597Z',
      updatedAt: '2024-10-19T23:24:14.391Z',
      number: 56938
    }
  ]
};

export const mockedOrderResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '123',
    ingredients: ['643d69a5c3f7b9001cfa0947', '643d69a5c3f7b9001cfa0940'],
    status: 'done',
    name: 'Краторный бессмертный фалленианский метеоритный бургер',
    createdAt: '2024-10-19T23:24:13.597Z',
    updatedAt: '2024-10-19T23:24:14.391Z',
    number: 56938
  },
  name: 'Краторный бессмертный фалленианский метеоритный бургер'
};

export const mockedProfileOrders = [
  {
    _id: '123',
    ingredients: ['643d69a5c3f7b9001cfa0947', '643d69a5c3f7b9001cfa0940'],
    status: 'done',
    name: 'Краторный бессмертный фалленианский метеоритный бургер',
    createdAt: '2024-10-19T23:24:13.597Z',
    updatedAt: '2024-10-19T23:24:14.391Z',
    number: 56938
  },
  {
    _id: '234',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-10-19T20:31:09.364Z',
    updatedAt: '2024-10-19T20:31:10.237Z',
    number: 56937
  }
];
export const mockedError = 'Ошибка при получении Orders';
