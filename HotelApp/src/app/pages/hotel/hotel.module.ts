import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HotelAdminComponent } from './hotel-admin/hotel-admin.component';
import { HotelComponentsModule } from 'src/app/components/hotel-components/hotel-components.module';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelRoutingModule } from './hotel-routing.module';
import { MaterialModule } from './../../components/material.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HotelListComponent,
    HotelAdminComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    MaterialModule,
    HotelComponentsModule
  ]
})
export class HotelModule { }
