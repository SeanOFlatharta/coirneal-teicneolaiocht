import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <h2>Contact Us</h2>
      <br>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <label for="name">Name:</label>
        <input type="text" id="name" formControlName="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email" required>

        <label for="message">Message:</label>
        <textarea id="message" formControlName="message" rows="5" required></textarea>

        <button type="submit" [disabled]="!contactForm.valid || isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </form>

      <p *ngIf="submitted" class="success-message">Message sent successfully!</p>
      <p *ngIf="error" class="error-message">{{ error }}</p>
    </section>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  isSubmitting = false;
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      // Send to backend
      this.http.post('http://localhost:3000/api/contact', this.contactForm.value)
        .subscribe({
          next: (response) => {
            console.log('Form submitted successfully:', response);
            this.submitted = true;
            this.contactForm.reset();
            this.isSubmitting = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
              this.submitted = false;
            }, 5000);
          },
          error: (error) => {
            console.error('Error submitting form:', error);
            this.error = 'Failed to send message. Please try again.';
            this.isSubmitting = false;
          }
        });
    }
  }
}