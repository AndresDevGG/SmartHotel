import { HotelDTO } from "src/app/models/hotel/hotel-dto";
import { HotelFilterDTO } from "src/app/models/hotel/hotel-filter-dto";
import { TypeRoomDTO } from "src/app/models/hotel/type-room-dto";

export interface HotelState {
  hotels: Array<HotelDTO>;
  hotel: HotelDTO;
  typeRooms: Array<TypeRoomDTO>,
  filter: HotelFilterDTO
}
