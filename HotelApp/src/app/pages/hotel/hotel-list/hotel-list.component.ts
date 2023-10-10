import { Component, OnDestroy, OnInit } from '@angular/core';

import { AppState } from 'src/app/store/core/app-state.model';
import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { Store } from '@ngrx/store';
import { hotelRoot } from 'src/app/store/hotel/hotel-state.root';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit, OnDestroy {

  hotels: Array<HotelDTO> = [];
  private _destroySubject: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(hotelRoot.GET_HOTELS());

    this.store.select(hotelRoot.selectHotels)
    .pipe(takeUntil(this._destroySubject))
    .subscribe( res => {
      this.hotels = res;
    })
  }

  ngOnDestroy(): void {
    this._destroySubject.next();
  }

}
