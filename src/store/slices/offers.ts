import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferType } from '../../types/offer-type';
import { fetchOffers, fetchCurrentOffer, fetchOfferComments,fetchOffersNearby } from '../api-actions';
import { DEFAULT_SORTING } from '../../const';
import { NameSpace, RequestStatus } from '../../const';
import { Comment } from '../../types/comment';

type OfferState = {
  offers: OfferType[];
  isOffersDataLoading: boolean;
  currentOffer: null | OfferType;
  isCurrentOfferDataLoading: RequestStatus;
  currentOfferComments: Comment[];
  nearbyOffers: OfferType[];
  isNearbyOfferDataLoading: RequestStatus;
  error: null | string;
  sortingOption: string;
}

const initialState: OfferState = {
  offers: [],
  isOffersDataLoading: false,
  currentOffer: null,
  isCurrentOfferDataLoading: RequestStatus.Idle,
  currentOfferComments: [],
  nearbyOffers: [],
  isNearbyOfferDataLoading: RequestStatus.Idle,
  error: null,
  sortingOption: DEFAULT_SORTING,
};

export const offerSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSortOption(state, action: PayloadAction<string>) {
      state.sortingOption = action.payload;
    },
    dropOffer(state, action: PayloadAction<null | OfferType>) {
      state.currentOffer = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.error = 'Error';
      })
      .addCase(fetchCurrentOffer.pending, (state) => {
        state.isCurrentOfferDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = RequestStatus.Fulfilled;
        state.currentOffer = action.payload;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        state.error = 'Error';
        state.isCurrentOfferDataLoading = RequestStatus.Rejected;
        state.currentOffer = null;
      })
      .addCase(fetchOfferComments.pending, (state) => {
        state.isCurrentOfferDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = RequestStatus.Fulfilled;
        state.currentOfferComments = action.payload;
      })
      .addCase(fetchOfferComments.rejected, (state) => {
        state.error = 'Error';
        state.currentOfferComments = [];
      })
      .addCase(fetchOffersNearby.pending, (state) => {
        state.isCurrentOfferDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = RequestStatus.Fulfilled;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.error = 'Error';
        state.isCurrentOfferDataLoading = RequestStatus.Rejected;
        state.nearbyOffers = [];
      });
  }
});

export const { changeSortOption, dropOffer } = offerSlice.actions;
