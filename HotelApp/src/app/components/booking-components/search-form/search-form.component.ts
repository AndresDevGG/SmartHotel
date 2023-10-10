import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { AppState } from 'src/app/store/core/app-state.model';
import { HotelFilterDTO } from 'src/app/models/hotel/hotel-filter-dto';
import { Store } from '@ngrx/store';
import { hotelRoot } from 'src/app/store/hotel/hotel-state.root';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy{


  @Input() cities: Array<string> [];
  public formFilter: FormGroup;
  private _destroySubject: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.formFilter = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
      qunatityPeople: new FormControl<number | null>(null),
      city: new FormControl<string | null>(null),
    });
  }

  public search(): void {
    const data = this.formFilter.value as HotelFilterDTO;
    this.store.dispatch(hotelRoot.SET_FILTER_HOTEL({data}))
  }

  ngOnDestroy(): void {
    this._destroySubject.next();

  }



}
