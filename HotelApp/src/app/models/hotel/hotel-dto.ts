import { RoomDTO } from "../room/room-dto";

export interface HotelDTO {
  id: string;
  createdAt: string;
	name: string;
	city: string;
	logo: string;
	active: boolean;
	rooms: Array<RoomDTO>;
}


