import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  template: `
    <div class="background">
      <header>
        <div class="header-content">
          <div class="header-center">
            <h1>Coirnéal Teicneolaíocht</h1>
          </div>

          <div class="search-container">
            <input type="text" #searchInput placeholder="🔍 Search..."
                   (keyup)="onSearchChange(searchInput.value)">
          </div>
        </div>

        <div class="navigation-row">
          <div class="nav-left-spacer"></div>

          <nav class="centered-nav">
            <ul>
              <li><a routerLink="/home" routerLinkActive="active">Baile</a></li>
              <li><a routerLink="/about" routerLinkActive="active">Cé muid féin</a></li>
              <li><a routerLink="/contact" routerLinkActive="active">Déan Teagmháil Linn</a></li>
            </ul>
          </nav>

          <!-- GitHub link with Font Awesome icon -->
          <a href="https://github.com/SeanOFlatharta" target="_blank" rel="noopener noreferrer" class="github-link">
            <i class="fa fa-github" style="font-size:36px;color:#4caf50"></i>
          </a>
        </div>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Coirnéal Teicneolaíocht';

  onSearchChange(searchTerm: string): void {
    // Implement search functionality
    console.log('Search term:', searchTerm);
  }
}