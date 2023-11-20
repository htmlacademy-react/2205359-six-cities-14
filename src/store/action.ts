import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { AuthorizationStatus } from '../const';

export const changeCity = createAction<string>('changeCity');

export const getOffers = createAction<OfferType[]>('getOffers');

export const changeSortOption = createAction<string>('changeSorting');

export const requireAuthorization = createAction<AuthorizationStatus>('reqiireAuth');
