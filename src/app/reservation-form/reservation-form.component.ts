import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservations/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm!: FormGroup;
  id = '';
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      checkInDate: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });
    let id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      let reservation = this.reservationService.getReservation(id);
      if (reservation) {
        this.reservationForm.patchValue(reservation);
      }
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let id = this.activatedRoute.snapshot.params['id'];
      let reservation = this.reservationForm.value;
      if (id) {
        this.reservationService.updateReservation({ ...reservation, id });
      } else {
        console.log(reservation);
        this.reservationService.addReservation(reservation);
      }

      this.router.navigate(['/list']);
    }
  }
}
