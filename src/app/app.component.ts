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
        <h1>Coirnéal Teicneolaíocht</h1>

        <nav>
          <ul>
            <li><a routerLink="/home" routerLinkActive="active">Baile</a></li>
            <li><a routerLink="/about" routerLinkActive="active">Cé muid féin</a></li>
            <li><a routerLink="/contact" routerLinkActive="active">Eolas</a></li>
          </ul>
        </nav>

        <!-- GitHub link with Font Awesome icon -->
        <a href="https://github.com/SeanOFlatharta" target="_blank" rel="noopener noreferrer">
          <i class="fa fa-github" style="font-size:48px;color:red"></i>
        </a>

        <div class="clear-float"></div>

        <div class="search-container">
          <input type="text" #searchInput placeholder="Search..."
                 (keyup)="onSearchChange(searchInput.value)">
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