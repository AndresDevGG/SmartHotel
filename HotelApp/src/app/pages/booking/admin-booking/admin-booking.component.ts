import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, filter, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store/core/app-state.model';
import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { hotelRoot } from 'src/app/store/hotel/hotel-state.root';

@Component({
  selector: 'app-admin-booking',
  templateUrl: './admin-booking.component.html',
  styleUrls: ['./admin-booking.component.scss']
})
export class AdminBookingComponent implements OnInit, OnDestroy {
  public hotel: HotelDTO = null;
  public id: string = '';
  private _destroySubject: Subject<void> = new Subject();

  public bookingFormGroup = this.fb.group({
    room: ['', Validators.required],
  });

  public guestsFormGroup = this.fb.group({
    guests: this.fb.array([])
  });

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private fb: FormBuilder

  ) {}

  ngOnInit(): void {
    this.store.dispatch(hotelRoot.GET_HOTELS());

    this.id = this.route.snapshot.paramMap.get('id')

    this.store.select(hotelRoot.selectHotels)
    .pipe(takeUntil(this._destroySubject))
    .subscribe( res => {
      if (res.length > 0) {
        this.hotel = JSON.parse(JSON.stringify(res.find(x => x.id === this.id)));
        this.hotel.rooms.forEach(x => {
          x.cost = Number(x.cost);
          x.total = (x.cost + (x.cost / 100 * x.tax))
        });
      }

    });

    this.store.select(hotelRoot.selectFilter)
    .pipe(takeUntil(this._destroySubject))
    .subscribe( res => {
      if (res !== null) {
        for (let index = 0; index < res.qunatityPeople; index++)
          this.guests.push(this.newGuest());
      }
    });
  }

  get guests() : FormArray {
    return this.guestsFormGroup.get("guests") as FormArray
  }

  guestForm(index: number)  {
    let form = this.guestsFormGroup.get("guests") as FormArray;
    return form.controls[index] as FormGroup;
  }

  public addGuest(): void {
    this.guests.push(this.newGuest());
  }

  public removeGuest(i:number): void {
    this.guests.removeAt(i);
  }

  private newGuest(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      birthdate: [null, Validators.required],
      gender: ['', [Validators.required]],
      typeDocument: ['', Validators.required],
      document: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  public chooseRoom(index: number, stepper: MatStepper): void {
    this.bookingFormGroup.controls.room.setValue(this.hotel.rooms[index].id)
    stepper.next();
  }

  public save(): void {

  }

  ngOnDestroy(): void {
    this._destroySubject.next();
  }
}
