import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offerSlice } from './slices/offers.ts';
import { citySlice } from './slices/city';
export const api = createAPI();
import { NameSpace } from '../const';

export const reducer = combineReducers({
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.Offers]: offerSlice.reducer,
});

// регистрация thunk в конфигурации хранилища.
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

// 1) Воспользуйтесь функцией api и сохраните настроенный экземпляр axios в переменную.

// 2) Обновите конфигурирование хранилища:
//     настройте middleware thunk и передайте в extraArgument экземпляр axios

// 3) Напишите код для загрузки и отрисовки списка предложений аренды с сервера
//        Список предложений должен загружаться при старте приложения.

