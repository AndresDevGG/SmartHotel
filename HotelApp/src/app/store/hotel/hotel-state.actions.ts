import { createAction, props } from '@ngrx/store';

import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { HotelFilterDTO } from 'src/app/models/hotel/hotel-filter-dto';
import { HotelPayload } from 'src/app/models/hotel/hotel-payload';
import { Saved } from 'src/app/services/common/http/http.service.model';
import { TypeRoomDTO } from 'src/app/models/hotel/type-room-dto';

const GET_HOTELS = createAction('[HOTEL] Get Hotels');
const GET_HOTELS_SUCCESS = createAction('[HOTEL] Get Hotels Success', props<{data: Array<HotelDTO>}>());
const GET_HOTELS_ERROR = createAction('[HOTEL] Get Hotels Error');

const SAVE_HOTEL = createAction('[HOTEL] Save Hotel', props<{payload: HotelPayload, redirect: boolean}>());
const SAVE_HOTEL_SUCCESS = createAction('[HOTEL] Save Hotel Success', props<{data: Saved}>());
const SAVE_HOTEL_ERROR = createAction('[HOTEL] Save Hotel Error');

const GET_HOTEL = createAction('[HOTEL] Get Hotel', props<{id: string}>());
const GET_HOTEL_SUCCESS = createAction('[HOTEL] Get Hotel Success', props<{data: HotelDTO}>());
const GET_HOTEL_ERROR = createAction('[HOTEL] Get Hotel Error');

const GET_TYPE_ROOMS = createAction('[HOTEL] Get Type Rooms');
const GET_TYPE_ROOMS_SUCCESS = createAction('[HOTEL] Get Type Rooms Success', props<{data: Array<TypeRoomDTO>}>());
const GET_TYPE_ROOMS_ERROR = createAction('[HOTEL] Get Type Rooms Error');

const SET_FILTER_HOTEL = createAction('[HOTEL] Set Hotel Filter', props<{data: HotelFilterDTO}>());

export {
  GET_HOTELS,
  GET_HOTELS_SUCCESS,
  GET_HOTELS_ERROR,
  SAVE_HOTEL,
  SAVE_HOTEL_SUCCESS,
  SAVE_HOTEL_ERROR,
  GET_HOTEL,
  GET_HOTEL_SUCCESS,
  GET_HOTEL_ERROR,
  GET_TYPE_ROOMS,
  GET_TYPE_ROOMS_SUCCESS,
  GET_TYPE_ROOMS_ERROR,
  SET_FILTER_HOTEL
}
