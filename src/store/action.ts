import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
// Создайте новый файл для описания действий (например, action.ts) и
// опишите в нём список действий, на основании которых формируется новый state.
//  На данном этапе нам потребуется несколько действий: изменение города и заполнение
// списка предложений по аренде. Действие для заполнения списка предложений должно поместить
// в хранилище все предложения по аренде. Пока используем тестовые данные.
export const changeCity = createAction('changeCity', (value: string) => ({
  payload: value,
}));

export const getOffers = createAction('getOffers', (value: OfferType[]) => ({
  payload: value,
}));

export const changeSortOption = createAction('changeSorting', (value: string) => ({
  payload: value,
}));
