import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Obstacle extends GameObject {
  speed: number;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private animationId: number = 0;

  // Game state
  gameState: 'start' | 'playing' | 'gameOver' = 'start';
  score: number = 0;
  highScore: number = 0;

  // Player (T-Rex)
  private player: GameObject & { velocityY: number; jumping: boolean } = {
    x: 50,
    y: 0,
    width: 40,
    height: 50,
    velocityY: 0,
    jumping: false
  };

  // Game physics
  private readonly GRAVITY = 0.6;
  private readonly JUMP_STRENGTH = -12;
  private readonly GROUND_HEIGHT = 50;

  // Obstacles
  private obstacles: Obstacle[] = [];
  private obstacleTimer: number = 0;
  private OBSTACLE_INTERVAL = 120; // frames between obstacles (adjusted based on screen size)

  // Game speed
  private gameSpeed: number = 5;
  private MAX_SPEED = 12;
  private isMobileApp: boolean = false;

  // Audio
  private backgroundMusic!: HTMLAudioElement;
  private jumpSound!: HTMLAudioElement;
  private gameOverSound!: HTMLAudioElement;
  private tryAgainSound!: HTMLAudioElement;
  private startGameSound!: HTMLAudioElement;
  musicEnabled: boolean = true;

  // Christmas theme - snowflakes
  private snowflakes: Array<{x: number; y: number; size: number; speed: number}> = [];

  ngAfterViewInit(): void {
    this.initCanvas();
    this.loadHighScore();
    this.loadMusicPreference();
    this.initAudio();
    this.initSnowflakes();
    this.setupEventListeners();
    this.gameLoop();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.removeEventListeners();
    this.stopMusic();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // Detect mobile/app based on screen size
    this.detectPlatform();

    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement!;
    canvas.width = Math.min(800, container.clientWidth - 40);
    canvas.height = 400;

    // Update player ground position
    this.player.y = canvas.height - this.GROUND_HEIGHT - this.player.height;
  }

  private detectPlatform(): void {
    // Detect if running on mobile/small screen (likely app)
    const screenWidth = window.innerWidth;
    this.isMobileApp = screenWidth < 768; // Tablets and phones

    if (this.isMobileApp) {
      // Slower speeds for mobile/app
      this.OBSTACLE_INTERVAL = 180;
      this.gameSpeed = 4;
      this.MAX_SPEED = 10;
      console.log('Mobile/App mode: Slower game speed');
    } else {
      // Normal speeds for desktop/web
      this.OBSTACLE_INTERVAL = 120;
      this.gameSpeed = 5;
      this.MAX_SPEED = 12;
      console.log('Desktop/Web mode: Normal game speed');
    }
  }

  private setupEventListeners(): void {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('touchstart', this.handleTouch);
  }

  private removeEventListeners(): void {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('touchstart', this.handleTouch);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      this.handleJump();
    }
  }

  private handleTouch = (e: TouchEvent): void => {
    this.handleJump();
  }

  private handleJump(): void {
    if (this.gameState === 'start') {
      this.startGame();
    } else if (this.gameState === 'playing' && !this.player.jumping) {
      this.player.velocityY = this.JUMP_STRENGTH;
      this.player.jumping = true;
      this.playJumpSound();
    } else if (this.gameState === 'gameOver') {
      this.restartGame();
    }
  }

  startGame(): void {
    this.gameState = 'playing';
    this.score = 0;
    this.gameSpeed = 5;
    this.obstacles = [];
    this.obstacleTimer = 0;
    this.playStartGameSound();
  }

  restartGame(): void {
    this.player.y = this.canvasRef.nativeElement.height - this.GROUND_HEIGHT - this.player.height;
    this.player.velocityY = 0;
    this.player.jumping = false;
    this.startGame();
  }

  private gameLoop = (): void => {
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  private update(): void {
    if (this.gameState !== 'playing') return;

    // Update score
    this.score++;

    // Gradually increase speed
    if (this.score % 100 === 0 && this.gameSpeed < this.MAX_SPEED) {
      this.gameSpeed += 0.5;
    }

    // Update player physics
    this.updatePlayer();

    // Update obstacles
    this.updateObstacles();

    // Check collisions
    this.checkCollisions();
  }

  private updatePlayer(): void {
    const canvas = this.canvasRef.nativeElement;
    const groundY = canvas.height - this.GROUND_HEIGHT - this.player.height;

    // Apply gravity
    this.player.velocityY += this.GRAVITY;
    this.player.y += this.player.velocityY;

    // Ground collision
    if (this.player.y >= groundY) {
      this.player.y = groundY;
      this.player.velocityY = 0;
      this.player.jumping = false;
    }
  }

  private updateObstacles(): void {
    const canvas = this.canvasRef.nativeElement;

    // Spawn new obstacles
    this.obstacleTimer++;
    if (this.obstacleTimer >= this.OBSTACLE_INTERVAL) {
      this.spawnObstacle();
      this.obstacleTimer = 0;
    }

    // Move obstacles
    this.obstacles.forEach(obstacle => {
      obstacle.x -= this.gameSpeed;
    });

    // Remove off-screen obstacles
    this.obstacles = this.obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
  }

  private spawnObstacle(): void {
    const canvas = this.canvasRef.nativeElement;
    const types = [
      { width: 20, height: 40 },  // Tall cactus
      { width: 30, height: 30 },  // Wide cactus
      { width: 15, height: 35 },  // Thin cactus
    ];

    const type = types[Math.floor(Math.random() * types.length)];

    this.obstacles.push({
      x: canvas.width,
      y: canvas.height - this.GROUND_HEIGHT - type.height,
      width: type.width,
      height: type.height,
      speed: this.gameSpeed
    });
  }

  private checkCollisions(): void {
    for (const obstacle of this.obstacles) {
      if (this.isColliding(this.player, obstacle)) {
        this.endGame();
        break;
      }
    }
  }

  private isColliding(obj1: GameObject, obj2: GameObject): boolean {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }

  private endGame(): void {
    this.gameState = 'gameOver';
    this.stopMusic();

    if (this.score > this.highScore) {
      this.highScore = this.score;
      this.saveHighScore();
    }

    // Play game over sound, then try again sound after 1 second
    this.playGameOverSound();

    setTimeout(() => {
      this.playTryAgainSound();
    }, 1000); // Wait 1 second after game over sound
  }

  private render(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;

    // Clear canvas with Christmas sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1a4d7a');    // Dark blue top
    gradient.addColorStop(0.5, '#2d6ba8');  // Medium blue
    gradient.addColorStop(1, '#e6f3ff');    // Light blue bottom
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw falling snow
    this.drawSnow(ctx, canvas);

    // Draw snowy ground
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, canvas.height - this.GROUND_HEIGHT, canvas.width, this.GROUND_HEIGHT);

    // Add snow texture/sparkle
    ctx.fillStyle = '#e6f7ff';
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.fillRect(i, canvas.height - this.GROUND_HEIGHT, 10, 5);
    }

    // Draw player (T-Rex) - Irish green
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);

    // Draw simple T-Rex details
    ctx.fillStyle = '#2e7d32';
    // Eye
    ctx.fillRect(this.player.x + 30, this.player.y + 5, 5, 5);
    // Arms
    ctx.fillRect(this.player.x + 5, this.player.y + 20, 10, 3);
    // Legs (animated based on position)
    const legOffset = this.player.jumping ? 0 : Math.floor(this.score / 5) % 2 * 5;
    ctx.fillRect(this.player.x + 10, this.player.y + this.player.height - 10, 8, 10);
    ctx.fillRect(this.player.x + 22 + legOffset, this.player.y + this.player.height - 10, 8, 10);

    // Draw obstacles - Christmas themed (candy canes and trees)
    this.obstacles.forEach(obstacle => {
      // Draw candy cane striped obstacles
      ctx.fillStyle = '#c41e3a'; // Red
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      // White stripes
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < obstacle.height; i += 8) {
        ctx.fillRect(obstacle.x, obstacle.y + i, obstacle.width, 4);
      }

      // Add green detail on top
      ctx.fillStyle = '#0f8b3d';
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, 5);
    });

    // Draw score with Christmas colors
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#c41e3a';
    ctx.lineWidth = 3;
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'right';
    ctx.strokeText(`Scór: ${Math.floor(this.score / 10)}`, canvas.width - 20, 30);
    ctx.fillText(`Scór: ${Math.floor(this.score / 10)}`, canvas.width - 20, 30);

    if (this.highScore > 0) {
      ctx.strokeText(`Ardscór: ${Math.floor(this.highScore / 10)}`, canvas.width - 20, 55);
      ctx.fillText(`Ardscór: ${Math.floor(this.highScore / 10)}`, canvas.width - 20, 55);
    }
  }

  // Christmas theme methods
  private initSnowflakes(): void {
    const canvas = this.canvasRef.nativeElement;
    // Create initial snowflakes
    for (let i = 0; i < 50; i++) {
      this.snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5
      });
    }
  }

  private drawSnow(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';

    this.snowflakes.forEach(flake => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();

      // Update snowflake position
      flake.y += flake.speed;
      flake.x += Math.sin(flake.y / 30) * 0.5; // Drift effect

      // Reset snowflake when it reaches bottom
      if (flake.y > canvas.height - this.GROUND_HEIGHT) {
        flake.y = 0;
        flake.x = Math.random() * canvas.width;
      }
    });
  }

  private loadHighScore(): void {
    const saved = localStorage.getItem('trexHighScore');
    if (saved) {
      this.highScore = parseInt(saved, 10);
    }
  }

  private saveHighScore(): void {
    localStorage.setItem('trexHighScore', this.highScore.toString());
  }

  getDisplayScore(): number {
    return Math.floor(this.score / 10);
  }

  getDisplayHighScore(): number {
    return Math.floor(this.highScore / 10);
  }

  // Audio methods
  private initAudio(): void {
    // Background music - Irish traditional music
    this.backgroundMusic = new Audio();
    this.backgroundMusic.src = 'assets/audio/irish-jig.mp3';
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.3;

    // Handle loading errors gracefully
    this.backgroundMusic.addEventListener('canplay', () => {
      console.log('Irish music loaded successfully');
    });

    this.backgroundMusic.addEventListener('error', (e) => {
      console.warn('Could not load Irish music file. Make sure irish-jig.mp3 is in src/assets/audio/');
    });

    // Jump sound - Use L audio from alphabet
    this.jumpSound = new Audio();
    this.jumpSound.src = 'assets/alphabet/audio/l_audio.mp3';
    this.jumpSound.volume = 0.6;

    this.jumpSound.addEventListener('error', (e) => {
      console.warn('Could not load l_audio.mp3 for jump sound');
    });

    // Game over sound - Use custom sound file
    this.gameOverSound = new Audio();
    this.gameOverSound.src = 'assets/audio/game_over_sound.mp3';
    this.gameOverSound.volume = 0.7;

    this.gameOverSound.addEventListener('error', (e) => {
      console.warn('Could not load game_over_sound.mp3. Using fallback beep sound.');
      // Fallback to generated beep if file not found
      this.gameOverSound.src = this.createBeepSound(220, 0.3);
    });

    // Try again sound
    this.tryAgainSound = new Audio();
    this.tryAgainSound.src = 'assets/audio/try_again_sound.mp3';
    this.tryAgainSound.volume = 0.7;

    this.tryAgainSound.addEventListener('error', (e) => {
      console.warn('Could not load try_again_sound.mp3.');
    });

    // Start game sound
    this.startGameSound = new Audio();
    this.startGameSound.src = 'assets/audio/start_game_sound.mp3';
    this.startGameSound.volume = 0.7;

    this.startGameSound.addEventListener('error', (e) => {
      console.warn('Could not load start_game_sound.mp3.');
    });
  }

  private createBeepSound(frequency: number, duration: number): string {
    const sampleRate = 44100;
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // WAV header
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, numSamples * 2, true);

    // Generate beep samples
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const value = Math.sin(2 * Math.PI * frequency * t) * 0.3 * (1 - i / numSamples);
      view.setInt16(44 + i * 2, value * 32767, true);
    }

    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  private writeString(view: DataView, offset: number, string: string): void {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  private createIrishMelody(): string {
    const sampleRate = 44100;
    const duration = 8; // 8 second loop
    const numSamples = Math.floor(sampleRate * duration);
    const buffer = new ArrayBuffer(44 + numSamples * 2);
    const view = new DataView(buffer);

    // WAV header
    this.writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + numSamples * 2, true);
    this.writeString(view, 8, 'WAVE');
    this.writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    this.writeString(view, 36, 'data');
    view.setUint32(40, numSamples * 2, true);

    // Irish jig melody notes (D major scale) - frequencies in Hz
    const melody = [
      587, 659, 698, 784, 659, 587, 523, // D E F G E D C
      587, 659, 698, 784, 880, 784, 698, // D E F G A G F
      587, 659, 698, 784, 659, 587, 523, // D E F G E D C
      523, 587, 659, 698, 587, 523, 494  // C D E F D C B
    ];

    const noteDuration = duration / melody.length;

    // Generate melody samples
    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const noteIndex = Math.floor(t / noteDuration) % melody.length;
      const freq = melody[noteIndex];
      const noteProgress = (t % noteDuration) / noteDuration;

      // Add envelope (attack, sustain, release)
      let envelope = 1;
      if (noteProgress < 0.05) {
        envelope = noteProgress / 0.05; // Attack
      } else if (noteProgress > 0.8) {
        envelope = (1 - noteProgress) / 0.2; // Release
      }

      // Generate tone with slight vibrato
      const vibrato = 1 + 0.02 * Math.sin(2 * Math.PI * 5 * t);
      const value = Math.sin(2 * Math.PI * freq * vibrato * t) * 0.15 * envelope;

      view.setInt16(44 + i * 2, value * 32767, true);
    }

    const blob = new Blob([buffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  private playMusic(): void {
    if (this.musicEnabled && this.backgroundMusic) {
      this.backgroundMusic.currentTime = 0;
      const playPromise = this.backgroundMusic.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Music playing successfully');
        }).catch(err => {
          console.warn('Audio play failed - may need user interaction first:', err);
          // Browser may require user interaction before playing audio
        });
      }
    }
  }

  private stopMusic(): void {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    }
  }

  private playJumpSound(): void {
    if (this.musicEnabled && this.jumpSound) {
      const sound = this.jumpSound.cloneNode() as HTMLAudioElement;
      sound.volume = 0.4;
      sound.play().catch(err => console.log('Jump sound failed:', err));
    }
  }

  private playGameOverSound(): void {
    if (this.musicEnabled && this.gameOverSound) {
      const sound = this.gameOverSound.cloneNode() as HTMLAudioElement;
      sound.volume = 0.7;
      sound.play().catch(err => console.log('Game over sound failed:', err));
    }
  }

  private playTryAgainSound(): void {
    if (this.musicEnabled && this.tryAgainSound) {
      const sound = this.tryAgainSound.cloneNode() as HTMLAudioElement;
      sound.volume = 0.7;
      sound.play().catch(err => console.log('Try again sound failed:', err));
    }
  }

  private playStartGameSound(): void {
    if (this.musicEnabled && this.startGameSound) {
      const sound = this.startGameSound.cloneNode() as HTMLAudioElement;
      sound.volume = 0.7;
      sound.play().catch(err => console.log('Start game sound failed:', err));

      // Start background music after start sound finishes
      sound.addEventListener('ended', () => {
        this.playMusic();
      });
    } else if (!this.musicEnabled) {
      // If music is disabled, still need to handle the game state
      // but don't play any sounds
    } else {
      // If sound failed to load, start music immediately as fallback
      this.playMusic();
    }
  }

  toggleMusic(): void {
    this.musicEnabled = !this.musicEnabled;
    this.saveMusicPreference();

    if (this.musicEnabled && this.gameState === 'playing') {
      this.playMusic();
    } else {
      this.stopMusic();
    }
  }

  private loadMusicPreference(): void {
    const saved = localStorage.getItem('trexMusicEnabled');
    if (saved !== null) {
      this.musicEnabled = saved === 'true';
    }
  }

  private saveMusicPreference(): void {
    localStorage.setItem('trexMusicEnabled', this.musicEnabled.toString());
  }
}
