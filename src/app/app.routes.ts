import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { AlphabetComponent } from './components/alphabet/alphabet.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'alphabet', component: AlphabetComponent },
  { path: 'game', component: GameComponent },
  { path: '**', redirectTo: '/home' }
];