import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <div class="contact-header">
        <h1>📧 Déan Teagmháil Linn</h1>
        <p class="subtitle">Let's Connect & Build the Future of Irish Learning Together</p>
      </div>

      <div class="contact-content">


        <div class="form-section">
          <div class="form-container">
            <div class="form-header">
              <h3>💌 Send Us Your Message</h3>
              <p>Every message is read personally and responded to with care. We typically reply within 24 hours!</p>
            </div>

            <!-- Debug info (hidden by default) -->
            <div class="debug-info" *ngIf="showDebug">
              <h4>🔧 Form Debug Info</h4>
              <div class="debug-details">
                <p><strong>Form Valid:</strong> {{ contactForm.valid ? '✅' : '❌' }}</p>
                <p><strong>Name Valid:</strong> {{ contactForm.get('name')?.valid ? '✅' : '❌' }}</p>
                <p><strong>Email Valid:</strong> {{ contactForm.get('email')?.valid ? '✅' : '❌' }}</p>
                <p><strong>Message Valid:</strong> {{ contactForm.get('message')?.valid ? '✅' : '❌' }}</p>
              </div>
              <button type="button" class="debug-btn" (click)="toggleDebug()">Hide Debug</button>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
              <div class="form-group">
                <label for="name" class="form-label">
                  <span class="label-icon">👤</span>
                  Your Name <span class="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  class="form-input"
                  [class.invalid]="contactForm.get('name')?.invalid && contactForm.get('name')?.touched"
                  placeholder="What should we call you?"
                  required>
                <div class="error-text" *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                  <span *ngIf="contactForm.get('name')?.errors?.['required']">📝 Please tell us your name</span>
                  <span *ngIf="contactForm.get('name')?.errors?.['minlength']">📝 Name should be at least 2 characters</span>
                </div>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">
                  <span class="label-icon">📧</span>
                  Email Address <span class="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  formControlName="email"
                  class="form-input"
                  [class.invalid]="contactForm.get('email')?.invalid && contactForm.get('email')?.touched"
                  placeholder="your.email@example.com"
                  required>
                <div class="error-text" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                  <span *ngIf="contactForm.get('email')?.errors?.['required']">📧 We need your email to reply to you</span>
                  <span *ngIf="contactForm.get('email')?.errors?.['email']">📧 Please enter a valid email address</span>
                </div>
              </div>

              <div class="form-group">
                <label for="message" class="form-label">
                  <span class="label-icon">💬</span>
                  Your Message <span class="required">*</span>
                </label>
                <textarea
                  id="message"
                  formControlName="message"
                  rows="6"
                  class="form-textarea"
                  [class.invalid]="contactForm.get('message')?.invalid && contactForm.get('message')?.touched"
                  placeholder="Tell us about your ideas, questions, or how we can help you with Irish language learning for children..."
                  required></textarea>
                <div class="error-text" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                  <span *ngIf="contactForm.get('message')?.errors?.['required']">💬 Please share your message with us</span>
                  <span *ngIf="contactForm.get('message')?.errors?.['minlength']">💬 Please write at least 10 characters</span>
                </div>
                <div class="character-count">
                  Characters: {{ contactForm.get('message')?.value?.length || 0 }}/500
                </div>
              </div>

              <div class="form-actions">
                <button
                  type="submit"
                  class="submit-btn"
                  [disabled]="!contactForm.valid || isSubmitting"
                  [class.enabled]="contactForm.valid && !isSubmitting"
                  [class.submitting]="isSubmitting">
                  <span class="btn-icon">{{ isSubmitting ? '⏳' : '🚀' }}</span>
                  {{ isSubmitting ? 'Sending Your Message...' : 'Send Message' }}
                </button>


              </div>
            </form>

            <!-- Success/Error Messages -->
            <div *ngIf="submitted" class="success-message">
              <div class="success-icon">🎉</div>
              <h4>Go raibh maith agat! (Thank you!)</h4>
              <p>Your message has been sent successfully! We'll get back to you within 24 hours.</p>
              <p class="success-note">Keep an eye on your inbox - we're excited to connect with you!</p>
            </div>

            <div *ngIf="error" class="error-message">
              <div class="error-icon">😔</div>
              <h4>Oops! Something went wrong</h4>
              <p>{{ error }}</p>
              <p class="error-note">Don't worry - your message is still captured in our system. Please try again or contact us directly.</p>
            </div>
          </div>
        </div>

        <div class="additional-info">
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">⚡</div>
              <h4>Quick Response</h4>
              <p>We typically respond within 24 hours, often much sooner!</p>
            </div>

            <div class="info-card">
              <div class="info-icon">🔒</div>
              <h4>Privacy Protected</h4>
              <p>Your information is secure and will never be shared with third parties.</p>
            </div>

            <div class="info-card">
              <div class="info-icon">🌍</div>
              <h4>Global Community</h4>
              <p>Join families worldwide who are passionate about Irish language learning!</p>
            </div>
          </div>

          <div class="community-message">
            <h3>🌟 Join Our Irish Learning Community</h3>
            <p>
              By reaching out, you're not just sending a message - you're joining a growing community of parents,
              educators, and Irish language enthusiasts who believe in preserving our beautiful heritage for the next generation.
            </p>
            <p class="community-highlight">
              <strong>Together, we're making Irish language learning joyful, accessible, and fun for children everywhere!</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  isSubmitting = false;
  error = '';
  showDebug = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    // Log form status changes for debugging
    this.contactForm.statusChanges.subscribe(status => {
      console.log('Form status changed:', status);
      console.log('Form valid:', this.contactForm.valid);
      console.log('Form errors:', this.getFormErrors());
    });
  }

  toggleDebug(): void {
    this.showDebug = !this.showDebug;
  }

  getFormErrors(): any {
    const errors: any = {};
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control && control.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  onSubmit(): void {
    console.log('Submit clicked!');
    console.log('Form valid:', this.contactForm.valid);
    console.log('Form value:', this.contactForm.value);

    // Mark all fields as touched to show validation errors
    this.contactForm.markAllAsTouched();

    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      console.log('Sending form data to backend:', this.contactForm.value);

      // Send to backend
      this.http.post(`${environment.apiUrl}/contact`, this.contactForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Form submitted successfully:', response);
            this.submitted = true;
            this.contactForm.reset();
            this.isSubmitting = false;

            // Hide success message after 5 seconds
            setTimeout(() => {
              this.submitted = false;
            }, 5000);
          },
          error: (error: any) => {
            console.error('Error submitting form:', error);
            if (error.status === 0) {
              this.error = 'Cannot connect to server. Please try again later or contact us directly.';
            } else {
              this.error = 'Failed to send message. Please try again.';
            }
            this.isSubmitting = false;
          }
        });
    } else {
      console.log('Form is invalid. Errors:', this.getFormErrors());
      this.error = 'Please fill in all required fields correctly.';
    }
  }
}