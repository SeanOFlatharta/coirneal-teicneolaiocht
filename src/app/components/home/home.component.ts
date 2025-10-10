import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <section>
      <h2>Baile</h2>
      <br>
      <p>This is a simple website to demonstrate HTML, CSS, and JavaScript code.</p>
      <br>
      <p>This will be used as a personal space to document software development practices and documentation.</p>
      <br>
      <br>
      <h2>Contact Us</h2>
      <br>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <label for="name">Name:</label>
        <input type="text" id="name" formControlName="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email" required>

        <button type="submit" [disabled]="!contactForm.valid">Submit</button>
      </form>

      <p *ngIf="submitted" class="success-message">Form submitted successfully!</p>
      
      <!-- App Gaeilge button centered under the form -->
      <div class="app-gaeilge-container">
        <a routerLink="/alphabet" class="app-gaeilge-button">App Gaeilge</a>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  contactForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.submitted = true;
      this.contactForm.reset();

      // Hide success message after 3 seconds
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }
}