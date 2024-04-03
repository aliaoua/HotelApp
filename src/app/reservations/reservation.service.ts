import { Injectable } from '@angular/core';
import { Reservation } from '../reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  reservations: Reservation[] = [];
  constructor() {
    let savedReservations = localStorage.getItem('reservations');
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  addReservation(reservation: Reservation) {
    let id = String(Date.now());
    reservation.id = id;
    this.reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  getReservations(): Reservation[] {
    return this.reservations;
  }
  getReservation(id: string): Reservation | undefined {
    return this.reservations.find((res) => res.id === id);
  }
  updateReservation(reservation: Reservation): void {
    let index = this.reservations.findIndex((res) => res.id === reservation.id);
    this.reservations[index] = reservation;
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
  deleteReservation(id: string): void {
    let index = this.reservations.findIndex((res) => res.id === id);
    this.reservations.splice(index, 1);
    localStorage.setItem('reservations', JSON.stringify(this.reservations));
  }
}
