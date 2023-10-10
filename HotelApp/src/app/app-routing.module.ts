import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'hotel',
    loadChildren: () => import('./pages/hotel/hotel.module').then(x => x.HotelModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./pages/booking/booking.module').then(x => x.BookingModule)
  },
  { path: '', redirectTo: 'booking', pathMatch: 'full' },
  { path: '**', redirectTo: 'booking' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
