import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { HotelPayload } from './../../models/hotel/hotel-payload';
import { HttpService } from './../common/http/http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Saved } from '../common/http/http.service.model';
import { TypeRoomDTO } from 'src/app/models/hotel/type-room-dto';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private root: string = 'hotel';

  constructor(private http: HttpService) { }

  public get(): Observable<Array<HotelDTO>> {
    return this.http.sendRequest<Array<HotelDTO>>('get', this.root);
  }

  public getById(id: string): Observable<HotelDTO> {
    return this.http.sendRequest<HotelDTO>('get', `${this.root}/${id}`);
  }

  public save(payload: HotelPayload): Observable<Saved> {
    return this.http.sendRequest<Saved>('post', this.root, payload);
  }

  public getTypeRooms(): Observable<Array<TypeRoomDTO>> {
    return this.http.sendRequest<Array<TypeRoomDTO>>('get', 'typeRoom');
  }

}
