import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        CommonModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('.welcome-header h1');
    expect(header?.textContent).toContain('Fáilte');
  });

  it('should display technology stack information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const techStack = compiled.querySelector('.tech-stack-card');
    expect(techStack).toBeTruthy();
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it('should have App Gaeilge button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const appButton = compiled.querySelector('.app-gaeilge-button');
    expect(appButton).toBeTruthy();
    expect(appButton?.textContent).toContain('App Gaeilge');
  });

  it('should display feature items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const features = compiled.querySelectorAll('.feature-item');
    expect(features.length).toBeGreaterThan(0);
  });

  it('should have technology badges', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badges = compiled.querySelectorAll('.tech-badge');
    expect(badges.length).toBeGreaterThan(0);
  });
});
