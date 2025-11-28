import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule, CommonModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the title 'Coirnéal Teicneolaíocht'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Coirnéal Teicneolaíocht');
  });

  it('should render header with title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header h1')?.textContent).toContain('Coirnéal Teicneolaíocht');
  });

  it('should have navigation links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('nav a');
    expect(navLinks.length).toBe(3);
  });

  it('should have search input', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const searchInput = compiled.querySelector('.search-container input');
    expect(searchInput).toBeTruthy();
  });

  it('should have GitHub link', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const githubLink = compiled.querySelector('.github-link');
    expect(githubLink).toBeTruthy();
    expect(githubLink?.getAttribute('href')).toContain('github.com/SeanOFlatharta');
  });

  it('should call onSearchChange when search input changes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'onSearchChange');
    
    fixture.detectChanges();
    const searchInput = fixture.nativeElement.querySelector('.search-container input') as HTMLInputElement;
    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('keyup'));
    
    expect(app.onSearchChange).toHaveBeenCalled();
  });

  it('should log search term in onSearchChange', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(console, 'log');
    
    app.onSearchChange('test search');
    
    expect(console.log).toHaveBeenCalledWith('Search term:', 'test search');
  });
});
