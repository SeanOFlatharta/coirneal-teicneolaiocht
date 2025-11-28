import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlphabetComponent } from './alphabet.component';
import { CommonModule } from '@angular/common';

describe('AlphabetComponent', () => {
  let component: AlphabetComponent;
  let fixture: ComponentFixture<AlphabetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlphabetComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AlphabetComponent);
    component = fixture.componentInstance;
    // Don't call detectChanges here to avoid random color issues
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 26 letters in alphabet array', () => {
    expect(component.alphabet.length).toBe(26);
  });

  it('should have letter data for common letters', () => {
    expect(component.letterData['A']).toBeDefined();
    expect(component.letterData['B']).toBeDefined();
    expect(component.letterData['G']).toBeDefined();
  });

  it('should have image and audio paths for letter A', () => {
    const letterA = component.letterData['A'];
    expect(letterA.image).toContain('assets/alphabet/images');
    expect(letterA.audio).toContain('assets/alphabet/audio');
  });

  it('should generate random color', () => {
    const color = component.getRandomColor();
    expect(color).toMatch(/^#[0-9A-F]{6}$/i);
  });

  it('should show image and sound when letter is clicked', () => {
    component.showImageAndSound('A');
    expect(component.selectedLetter).toBe('A');
    expect(component.selectedImageUrl).toContain('a_pic.jpg');
  });

  it('should close image when closeImage is called', () => {
    component.selectedLetter = 'A';
    component.selectedImageUrl = 'test.jpg';
    
    component.closeImage();
    
    expect(component.selectedLetter).toBeNull();
    expect(component.selectedImageUrl).toBeNull();
  });

  it('should play audio when showImageAndSound is called', () => {
    const audioElement = document.createElement('audio');
    component.audioPlayer = { nativeElement: audioElement } as any;
    spyOn(audioElement, 'play');

    component.showImageAndSound('A');
    
    expect(audioElement.src).toContain('a_audio.mp3');
    expect(audioElement.play).toHaveBeenCalled();
  });

  it('should check asset configuration on init', () => {
    spyOn(component, 'checkAssetConfiguration');
    component.ngOnInit();
    expect(component.checkAssetConfiguration).toHaveBeenCalled();
  });

  it('should handle letters without data gracefully', () => {
    component.showImageAndSound('Z'); // Assuming Z doesn't have data
    // Should not throw error
    expect(component.selectedLetter).toBe('Z');
  });
});
