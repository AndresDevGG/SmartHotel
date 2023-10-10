import * as Actions from "./hotel-state.actions";

import { createReducer, on, props } from "@ngrx/store";

import { HotelState } from "./hotel-state.model";

const initialState: HotelState = {
  hotel: null,
  hotels: [],
  typeRooms: [],
  filter: null
};

export const HotelReducer = createReducer(
  initialState,
  on(Actions.GET_HOTELS_SUCCESS, (state, action) => ({ ...state, hotels: action.data})),
  on(Actions.GET_HOTEL_SUCCESS, (state, action) => ({ ...state, hotel: action.data})),
  on(Actions.GET_TYPE_ROOMS_SUCCESS, (state, action) => ({ ...state, typeRooms: action.data})),
  on(Actions.SET_FILTER_HOTEL, (state, action) => ({ ...state, filter: action.data})),
);
