import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservations/reservation.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations!: Reservation[];
  constructor(private reservationService: ReservationService) {}
  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations();
  }
  onDelete(id: string) {
    this.reservationService.deleteReservation(id);
  }
}
