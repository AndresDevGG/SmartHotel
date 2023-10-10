import { RouterModule, Routes } from '@angular/router';

import { AdminBookingComponent } from './admin-booking/admin-booking.component';
import { MyBookingComponent } from './my-booking/my-booking.component';
import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'new-booking/:id',
    component: AdminBookingComponent
  },
  {
    path: 'booking-info/:id',
    component: MyBookingComponent
  },
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: '**', redirectTo: 'search' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
