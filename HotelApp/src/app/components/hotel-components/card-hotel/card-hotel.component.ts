import { Component, Input, OnInit } from '@angular/core';

import { HotelDTO } from 'src/app/models/hotel/hotel-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-hotel',
  templateUrl: './card-hotel.component.html',
  styleUrls: ['./card-hotel.component.scss']
})
export class CardHotelComponent implements OnInit{

  public minPrice: number = 0;
  public mode: 'admin' | 'user' = 'user';
  @Input() hotel: HotelDTO = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.minPrice = [...this.hotel.rooms].sort((a, b) => a.cost - b.cost )[0].cost;
  }

  get isUser() {
    return this.mode === 'user';
  }
  get isAdmin() {
    return this.mode === 'admin';
  }

  booking() {
    this.router.navigateByUrl(`/booking/new-booking/${this.hotel.id}`)
  }

}
