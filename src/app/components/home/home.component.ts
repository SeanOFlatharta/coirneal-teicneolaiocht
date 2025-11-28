import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section>
      <div class="welcome-header">
        <h1>🍀 Fáilte - Welcome!</h1>
        <p class="tagline">Modern Irish Web Development & Technology Showcase</p>
      </div>

      <div class="content-grid">
        <div class="intro-card">
          <h2>About This Website</h2>
          <p>Welcome to our modern Irish website - a dynamic platform that celebrates Irish culture while showcasing cutting-edge web technologies. This site serves as both a cultural experience and a demonstration of professional software development practices.</p>

          <div class="features-list">
            <div class="feature-item">
              <span class="feature-icon">🏠</span>
              <span>Interactive Irish Language Learning</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📧</span>
              <span>Professional Contact System with Email Integration</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">📱</span>
              <span>Fully Responsive Design for All Devices</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎵</span>
              <span>Audio-Enhanced Alphabet Learning App</span>
            </div>
          </div>
        </div>

        <div class="tech-stack-card">
          <h2>🚀 Technology Stack</h2>
          <p>This website is built with modern, professional-grade technologies:</p>

          <div class="tech-category">
            <h3>Frontend Technologies</h3>
            <div class="tech-badges">
              <span class="tech-badge angular">Angular 17</span>
              <span class="tech-badge typescript">TypeScript</span>
              <span class="tech-badge css">CSS3</span>
              <span class="tech-badge responsive">Responsive Design</span>
            </div>
          </div>

          <div class="tech-category">
            <h3>Backend & Services</h3>
            <div class="tech-badges">
              <span class="tech-badge nodejs">Node.js</span>
              <span class="tech-badge express">Express.js</span>
              <span class="tech-badge email">Gmail API</span>
              <span class="tech-badge validation">Form Validation</span>
            </div>
          </div>

          <div class="tech-category">
            <h3>Development Tools</h3>
            <div class="tech-badges">
              <span class="tech-badge git">Git Version Control</span>
              <span class="tech-badge github">GitHub</span>
              <span class="tech-badge vscode">VS Code</span>
              <span class="tech-badge npm">NPM Packages</span>
            </div>
          </div>
        </div>

        <div class="navigation-card">
          <h2>Explore the Site</h2>
          <div class="nav-links">
            <a routerLink="/about" class="nav-link">
              <span class="nav-icon">👥</span>
              <div>
                <strong>Cé muid féin</strong>
                <small>Learn about our story and mission</small>
              </div>
            </a>
            <a routerLink="/contact" class="nav-link">
              <span class="nav-icon">📧</span>
              <div>
                <strong>Déan Teagmháil Linn</strong>
                <small>Get in touch with professional email system</small>
              </div>
            </a>
            <a routerLink="/alphabet" class="nav-link">
              <span class="nav-icon">🔤</span>
              <div>
                <strong>Aibítir</strong>
                <small>Interactive Irish alphabet learning</small>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- App Gaeilge button - featured prominently -->
      <div class="app-gaeilge-container">
        <div class="app-gaeilge-intro">
          <h3>Ready to Learn Irish?</h3>
          <p>Start your journey with our interactive alphabet learning app!</p>
        </div>
        <a routerLink="/alphabet" class="app-gaeilge-button">
          🍀 Launch App Gaeilge
        </a>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {}
}