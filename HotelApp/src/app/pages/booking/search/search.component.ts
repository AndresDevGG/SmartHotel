import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { AppState } from 'src/app/store/core/app-state.model';
import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { Store } from '@ngrx/store';
import { hotelRoot } from 'src/app/store/hotel/hotel-state.root';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  hotels: Array<HotelDTO> = [];
  private _destroySubject: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {

    this.store.select(hotelRoot.selectHotels)
    .pipe(takeUntil(this._destroySubject))
    .subscribe( res => {
      this.hotels = res;
    })

    this.store.select(hotelRoot.selectFilter)
    .pipe(takeUntil(this._destroySubject))
    .subscribe( res => {
      if (res!== null) {
        this.store.dispatch(hotelRoot.GET_HOTELS());
      }
    })
  }

  ngOnDestroy(): void {
    this._destroySubject.next();
  }
}
