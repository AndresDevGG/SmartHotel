import { RouterModule, Routes } from '@angular/router';

import { HotelAdminComponent } from './hotel-admin/hotel-admin.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HotelListComponent
  },
  {
    path: 'admin',
    component: HotelAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
