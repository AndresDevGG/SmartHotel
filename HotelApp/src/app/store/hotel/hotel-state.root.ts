import { GET_HOTEL, GET_HOTELS, GET_TYPE_ROOMS, SAVE_HOTEL, SET_FILTER_HOTEL } from "./hotel-state.actions";
import { selectFilter, selectHotel, selectHotels, selectTypeRooms } from "./hotel-state.select";

import { HotelEffects } from "./hotel-state.effects";
import { HotelReducer } from "./hotel-state.reducer";

export const hotelRoot = {
  GET_HOTELS,
  SAVE_HOTEL,
  GET_HOTEL,
  GET_TYPE_ROOMS,
  SET_FILTER_HOTEL,
  HotelReducer,
  HotelEffects,
  selectHotels,
  selectHotel,
  selectTypeRooms,
  selectFilter
};
