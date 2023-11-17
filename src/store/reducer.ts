import { createReducer } from '@reduxjs/toolkit';
import './action.ts';
import { OfferType } from '../types/offer-type';
import { CardOffer } from '../mocks/cardOffer';
import { changeCity, changeSortOption, getOffers } from './action.ts';
import { DEFAULT_CITY } from '../const.ts';

// Создайте новый файл для описания редьюсера (например, reducer.ts). Опишите в нём:
// + Объект начального состояния: город (используется для отбора списка предложений в определённом городе)
// и список предложений по аренде.
// + Функцию-редьюсер. Она принимает в качестве параметров текущий state и действие (action).
// Результатом выполнения редьюсера станет новое состояние.
// Обратите внимание, для именования функций-редьюсеров применяются существительные.

type StateType = {
  city: string;
  offers: OfferType[];
  sortingOption: string;
};

const InitialState : StateType = {
  city: DEFAULT_CITY,
  offers: CardOffer,
  sortingOption: 'Popular',
};

export const reducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sortingOption = action.payload;
    });
});
