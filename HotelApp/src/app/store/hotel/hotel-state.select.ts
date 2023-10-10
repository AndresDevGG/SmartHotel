import { HotelDTO } from "src/app/models/hotel/hotel-dto";
import { HotelFilterDTO } from "src/app/models/hotel/hotel-filter-dto";
import { HotelState } from "./hotel-state.model";
import { TypeRoomDTO } from "src/app/models/hotel/type-room-dto";
import { createSelector } from "@ngrx/store";

const getHotels = (state: HotelState): Array<HotelDTO> => state.hotels;
const getTypeRooms = (state: HotelState): Array<TypeRoomDTO> => state.typeRooms;
const getHotel = (state: HotelState): HotelDTO => state.hotel;
const getFilter = (state: HotelState): HotelFilterDTO => state.filter;

const selectHotels = createSelector((state: { hotelState: HotelState }) => state.hotelState, getHotels);
const selectTypeRooms = createSelector((state: { hotelState: HotelState }) => state.hotelState, getTypeRooms);
const selectHotel = createSelector((state: { hotelState: HotelState }) => state.hotelState, getHotel);
const selectFilter = createSelector((state: { hotelState: HotelState }) => state.hotelState, getFilter);

export { selectHotels, selectHotel, selectTypeRooms, selectFilter };
