import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardHotelComponent } from './card-hotel/card-hotel.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../material.module';
import { NewHotelFormComponent } from './new-hotel-form/new-hotel-form.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    NewHotelFormComponent,
    CardHotelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    NewHotelFormComponent,
    CardHotelComponent
  ]
})
export class HotelComponentsModule { }
