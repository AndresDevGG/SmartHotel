import { RoomPayload } from "../room/hotel-payload";

export interface HotelPayload {
	name?: string;
	logo?: string;
	rooms: Array<RoomPayload>;
}
