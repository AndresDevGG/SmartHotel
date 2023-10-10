import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/core/app-state.model';
import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { HotelPayload } from 'src/app/models/hotel/hotel-payload';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomPayload } from 'src/app/models/room/hotel-payload';
import { Store } from '@ngrx/store';
import { TypeRoomDTO } from 'src/app/models/hotel/type-room-dto';
import { hotelRoot } from 'src/app/store/hotel/hotel-state.root';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-hotel-form',
  templateUrl: './new-hotel-form.component.html',
  styleUrls: ['./new-hotel-form.component.scss']
})
export class NewHotelFormComponent implements OnInit, OnDestroy {

  public typeRooms: Array<TypeRoomDTO> = [];

  public hotelFormGroup = this.fb.group({
    name: ['', Validators.required],
    logo: [''],
  });

  public roomsFormGroup = this.fb.group({
    rooms: this.fb.array([this.newRoom()])
  });
  private _destroySubject: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}


  ngOnInit(): void {
    this.store.dispatch(hotelRoot.GET_TYPE_ROOMS());
    this.store.select(hotelRoot.selectTypeRooms)
    .pipe(takeUntil(this._destroySubject))
    .subscribe(response => {
      this.typeRooms = response;
    })
  }

  get rooms() : FormArray {
    return this.roomsFormGroup.get("rooms") as FormArray
  }

  get objectToSave(): HotelPayload {
    const hotel: HotelPayload = {
      ...this.hotelFormGroup.value,
      rooms: []
    };
    const rooms = this.roomsFormGroup.value.rooms as Array<RoomPayload>;
    hotel.rooms = rooms;
    return hotel;
  }

  roomForm(index: number)  {
    let form = this.roomsFormGroup.get("rooms") as FormArray;
    return form.controls[index] as FormGroup;
  }

  private newRoom(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      typeRoom: ['', Validators.required],
      cost: [0, [Validators.required, Validators.min(0)]],
      tax: [0, Validators.min(0)],
      floor: [1, [Validators.required, Validators.min(1), Validators.max(163)]],
      numRoom: [100, [Validators.required, Validators.min(100)]],
    });
  }

  removeRoom(i:number) {
    this.rooms.removeAt(i);
  }

  public addRoom(): void {
    this.rooms.push(this.newRoom());
  }

  save(): void {
    if (!this.hotelFormGroup.valid) {
      return;
    }

    this.store.dispatch(hotelRoot.SAVE_HOTEL({payload: this.objectToSave, redirect: true}))

  }

  ngOnDestroy(): void {
    this._destroySubject.next();
  }

}
