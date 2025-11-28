import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { CommonModule } from '@angular/common';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render about header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('.about-header h1');
    expect(header?.textContent).toContain('Cé muid féin');
  });

  it('should display mission section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mission = compiled.querySelector('.mission-section');
    expect(mission).toBeTruthy();
  });

  it('should have vision cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const visionCards = compiled.querySelectorAll('.vision-card');
    expect(visionCards.length).toBeGreaterThan(0);
  });

  it('should display heritage section with Flaherty crest', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heritage = compiled.querySelector('.heritage-section');
    const crestImage = compiled.querySelector('.heritage-image img');
    expect(heritage).toBeTruthy();
    expect(crestImage?.getAttribute('src')).toContain('flaherty_crest.jpg');
  });

  it('should have statistics display', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const stats = compiled.querySelectorAll('.stat-item');
    expect(stats.length).toBeGreaterThan(0);
  });

  it('should display technology section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tech = compiled.querySelector('.technology-section');
    expect(tech).toBeTruthy();
  });

  it('should have call to action section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cta = compiled.querySelector('.call-to-action');
    expect(cta).toBeTruthy();
  });
});
