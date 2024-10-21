import { TOrder } from '@utils-types';

export const mockedFeeds = {
  success: true,
  orders: [
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
    },
    {
      _id: '333',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0946'
      ],
      status: 'done',
      name: 'Флюоресцентный антарианский space астероидный фалленианский бессмертный минеральный альфа-сахаридный экзо-плантаго традиционный-галактический spicy люминесцентный метеоритный бургер',
      createdAt: '2024-10-19T19:51:31.125Z',
      updatedAt: '2024-10-19T19:51:31.956Z',
      number: 56936
    }
  ],
  total: 50524,
  totalToday: 146
};

export const mockedError = 'Ошибка при получении списка заказов';

interface FeedsState {
  success: boolean;
  orders: TOrder[];
  isLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
}

export const initialState: FeedsState = {
  success: false,
  orders: [],
  isLoading: false,
  error: null,
  total: 0,
  totalToday: 0
};
