import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with start game state', () => {
    expect(component.gameState).toBe('start');
  });

  it('should have initial score of 0', () => {
    expect(component.score).toBe(0);
  });

  it('should start game when startGame is called', () => {
    component.startGame();
    expect(component.gameState).toBe('playing');
    expect(component.score).toBe(0);
  });

  it('should restart game when restartGame is called', () => {
    component.score = 100;
    component.gameState = 'gameOver';
    component.restartGame();
    expect(component.gameState).toBe('playing');
    expect(component.score).toBe(0);
  });

  it('should calculate display score correctly', () => {
    component.score = 150;
    expect(component.getDisplayScore()).toBe(15);
  });

  it('should calculate display high score correctly', () => {
    component.highScore = 250;
    expect(component.getDisplayHighScore()).toBe(25);
  });

  it('should have canvas element in template', () => {
    const compiled = fixture.nativeElement;
    const canvas = compiled.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should display game title', () => {
    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('h1');
    expect(title?.textContent).toContain('Rith Dino');
  });

  it('should show start overlay when game state is start', () => {
    component.gameState = 'start';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const overlay = compiled.querySelector('.overlay');
    expect(overlay).toBeTruthy();
  });
});
