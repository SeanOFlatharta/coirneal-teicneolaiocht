import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LetterData {
  image: string;
  audio: string;
}

@Component({
  selector: 'app-alphabet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alphabet-container">
      <div class="container">
        <h1 class="title">Aibítir/Alphabet</h1>

        <div class="grid-container" id="grid-container">
          <div
            *ngFor="let letter of alphabet"
            class="grid-item"
            [style.background-color]="getRandomColor()"
            (click)="showImageAndSound(letter)"
          >
            {{ letter }}
          </div>
        </div>
      </div>

      <!-- Image Modal Overlay -->
      <div
        class="image-overlay"
        [style.display]="selectedLetter ? 'flex' : 'none'"
        (click)="closeImage()"
      >
        <div class="image-container" (click)="$event.stopPropagation()">
          <button class="close-button" (click)="closeImage()">&times;</button>
          <div class="image-content">
            <h3 class="letter-title">{{ selectedLetter }}</h3>
            <img
              [src]="selectedImageUrl"
              [alt]="'Letter ' + selectedLetter + ' image'"
              *ngIf="selectedImageUrl"
            >
          </div>
        </div>
      </div>

      <audio
        #audioPlayer
        controls
        style="display:none;"
      >
        Your browser does not support the audio element.
      </audio>
    </div>
  `,
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {
  @ViewChild('audioPlayer', { static: false }) audioPlayer!: ElementRef<HTMLAudioElement>;

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;
  selectedImageUrl: string | null = null;

  letterData: Record<string, LetterData> = {
    'A': { image: 'assets/alphabet/images/a_pic.jpg', audio: 'assets/alphabet/audio/a_audio.mp3' },
    'B': { image: 'assets/alphabet/images/cow.jpg', audio: 'assets/alphabet/audio/bo_audio.mp3' },
    'C': { image: 'assets/alphabet/images/cat.jpg', audio: 'assets/alphabet/audio/cat.mp3' },
    'D': { image: 'assets/alphabet/images/d_pic.jpg', audio: 'assets/alphabet/audio/d_audio.mp3' },
    'E': { image: 'assets/alphabet/images/e_pic.jpg', audio: 'assets/alphabet/audio/e_audio.mp3' },
    'F': { image: 'assets/alphabet/images/f_pic_2.jpg', audio: 'assets/alphabet/audio/f_audio_2.mp3' },
    'G': { image: 'assets/alphabet/images/g_pic.jpg', audio: 'assets/alphabet/audio/g_audio.mp3' },
    'H': { image: 'assets/alphabet/images/h_pic.jpg', audio: 'assets/alphabet/audio/h_audio.mp3' },
    'I': { image: 'assets/alphabet/images/i_pic.jpg', audio: 'assets/alphabet/audio/i_audio.mp3' },
    'L': { image: 'assets/alphabet/images/l_pic.jpg', audio: 'assets/alphabet/audio/l_audio.mp3' },
    'M': { image: 'assets/alphabet/images/m_pic.jpg', audio: 'assets/alphabet/audio/m_audio.mp3' },
    'R': { image: 'assets/alphabet/images/r_pic.jpg', audio: 'assets/alphabet/audio/r_audio.mp3' },
    'S': { image: 'assets/alphabet/images/s_pic.jpg', audio: 'assets/alphabet/audio/s_audio.mp3' },
    'T': { image: 'assets/alphabet/images/t_pic.jpg', audio: 'assets/alphabet/audio/t_audio.mp3' },
    'U': { image: 'assets/alphabet/images/apple.jpg', audio: 'assets/alphabet/audio/audio.mp3' },
    // Alternative F option available: f_pic.jpg with f_audio.mp3
    // Note: Currently using f_pic_2.jpg and f_audio_2.mp3 as configured above
  };

  ngOnInit(): void {
    // Component initialization and asset verification
    this.checkAssetConfiguration();
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  showImageAndSound(letter: string): void {
    const data = this.letterData[letter];
    if (data) {
      this.selectedLetter = letter;
      this.selectedImageUrl = data.image;

      console.log(`Loading assets for letter ${letter}:`, {
        image: data.image,
        audio: data.audio
      });

      // Play audio
      if (this.audioPlayer) {
        const audioElement = this.audioPlayer.nativeElement;
        audioElement.src = data.audio;
        audioElement.load();
        audioElement.play().catch((error: any) => {
          console.error(`Audio playback failed for letter ${letter}:`, error);
          console.log('Audio file path:', data.audio);
          // Fallback: try to play without user interaction requirements
        });
      }
    } else {
      // Handle letters without associated media
      this.selectedLetter = letter;
      this.selectedImageUrl = null;
      console.log(`No media found for letter: ${letter}`);
      console.log('Available letters with media:', Object.keys(this.letterData));
    }
  }

  // Method to check which assets are configured vs available
  checkAssetConfiguration(): void {
    console.log('=== ALPHABET ASSET CONFIGURATION CHECK ===');
    console.log('Configured letters:', Object.keys(this.letterData).sort());
    console.log('All alphabet letters:', this.alphabet);

    const configuredLetters = Object.keys(this.letterData);
    const missingLetters = this.alphabet.filter(letter => !configuredLetters.includes(letter));

    if (missingLetters.length > 0) {
      console.warn('Letters without assets:', missingLetters);
    } else {
      console.log('✅ All letters have assets configured!');
    }

    // Test each configured asset
    configuredLetters.forEach(letter => {
      const data = this.letterData[letter];
      console.log(`${letter}: Image=${data.image}, Audio=${data.audio}`);
    });
  }

  // Method to close the image modal
  closeImage(): void {
    this.selectedLetter = null;
    this.selectedImageUrl = null;

    // Stop any currently playing audio
    if (this.audioPlayer) {
      const audioElement = this.audioPlayer.nativeElement;
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }

  // Listen for ESC key to close modal
  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: KeyboardEvent): void {
    if (this.selectedLetter) {
      this.closeImage();
    }
  }
}