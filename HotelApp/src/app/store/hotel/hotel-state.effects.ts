import * as HotelActions from './hotel-state.actions'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { finished, inProcess, inQueue } from 'src/app/common/utils/logs-proccess';

import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelEffects {

  constructor(
    private actions$: Actions,
    private hotelService: HotelService,
    private router: Router
  ) {}

  getHotelsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HotelActions.GET_HOTELS),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.hotelService.get()
        .pipe(
          map(response => {
            if (response) {
              return HotelActions.GET_HOTELS_SUCCESS({data: response})
            } else {
              return HotelActions.GET_HOTELS_ERROR()
            }
          }),
          catchError(error => of(HotelActions.GET_HOTELS_ERROR())),
          tap((action) => finished(action.type))
        );
      })
    );
  });

  saveHotelEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HotelActions.SAVE_HOTEL),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.hotelService.save(action.payload)
        .pipe(
          map(response => {
            if (response) {
              this.router.navigateByUrl('/hotel');
              return HotelActions.SAVE_HOTEL_SUCCESS({data: response})
            } else {
              return HotelActions.SAVE_HOTEL_ERROR()
            }

          }),
          catchError(error => of(HotelActions.SAVE_HOTEL_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

  getHotelByIdEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HotelActions.GET_HOTEL),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.hotelService.getById(action.id)
        .pipe(
          map(response => {
            if (response) {
              return HotelActions.GET_HOTEL_SUCCESS({data: response})
            } else {
              return HotelActions.GET_HOTEL_ERROR()
            }
          }),
          catchError(error => of(HotelActions.GET_HOTEL_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

  getTypeRoomsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(HotelActions.GET_TYPE_ROOMS),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.hotelService.getTypeRooms()
        .pipe(
          map(response => {
            if (response) {
              return HotelActions.GET_TYPE_ROOMS_SUCCESS({data: response})
            } else {
              return HotelActions.GET_TYPE_ROOMS_ERROR()
            }
          }),
          catchError(error => of(HotelActions.GET_TYPE_ROOMS_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

}
