export interface RoomDTO {
  id: string;
  floor: number;
	createdAt: string;
	cost: number;
	name: string;
	hotel: string;
	active: boolean;
	typeRoom: string;
	numRoom: number;
	tax: number;

  total?: number;
}
