import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { BookingComponentsModule } from 'src/app/components/booking-components/booking-components.module';
import { BookingRoutingModule } from './booking-routing.module';
import { CommonModule } from '@angular/common';
import { HotelComponentsModule } from 'src/app/components/hotel-components/hotel-components.module';
import { MaterialModule } from './../../components/material.module';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    MyBookingComponent,
    AdminBookingComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    BookingComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    HotelComponentsModule,
    MaterialModule
  ]
})
export class BookingModule { }
