import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize contact form with empty values', () => {
    expect(component.contactForm.value).toEqual({
      name: '',
      email: '',
      message: ''
    });
  });

  it('should have name field as required', () => {
    const nameControl = component.contactForm.get('name');
    expect(nameControl?.valid).toBeFalsy();
    
    nameControl?.setValue('John');
    expect(nameControl?.valid).toBeTruthy();
  });

  it('should validate email format', () => {
    const emailControl = component.contactForm.get('email');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalsy();
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBeTruthy();
  });

  it('should require minimum length for name', () => {
    const nameControl = component.contactForm.get('name');
    
    nameControl?.setValue('J');
    expect(nameControl?.hasError('minlength')).toBeTruthy();
    
    nameControl?.setValue('John');
    expect(nameControl?.hasError('minlength')).toBeFalsy();
  });

  it('should require minimum length for message', () => {
    const messageControl = component.contactForm.get('message');
    
    messageControl?.setValue('Short');
    expect(messageControl?.hasError('minlength')).toBeTruthy();
    
    messageControl?.setValue('This is a longer message');
    expect(messageControl?.hasError('minlength')).toBeFalsy();
  });

  it('should not submit form if invalid', () => {
    component.onSubmit();
    expect(component.isSubmitting).toBeFalsy();
    expect(component.submitted).toBeFalsy();
  });

  it('should submit form when valid', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message'
    });

    component.onSubmit();

    const req = httpMock.expectOne(`${environment.apiUrl}/contact`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message'
    });

    req.flush({ success: true });

    expect(component.submitted).toBeTruthy();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('should reset form after successful submission', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });

    component.onSubmit();

    const req = httpMock.expectOne(`${environment.apiUrl}/contact`);
    req.flush({ success: true });

    expect(component.contactForm.value).toEqual({
      name: null,
      email: null,
      message: null
    });
  });

  it('should handle submission error', () => {
    component.contactForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Test message'
    });

    component.onSubmit();

    const req = httpMock.expectOne(`${environment.apiUrl}/contact`);
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    expect(component.error).toBeTruthy();
    expect(component.isSubmitting).toBeFalsy();
  });

  it('should toggle debug mode', () => {
    expect(component.showDebug).toBeFalsy();
    component.toggleDebug();
    expect(component.showDebug).toBeTruthy();
    component.toggleDebug();
    expect(component.showDebug).toBeFalsy();
  });

  it('should get form errors', () => {
    const errors = component.getFormErrors();
    expect(errors.name).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeDefined();
  });

  it('should mark all fields as touched on invalid submit', () => {
    spyOn(component.contactForm, 'markAllAsTouched');
    component.onSubmit();
    expect(component.contactForm.markAllAsTouched).toHaveBeenCalled();
  });
});
