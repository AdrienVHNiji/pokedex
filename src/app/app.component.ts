import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Rend le composant autonome
  imports: [RouterOutlet], // Ajoute RouterOutlet pour gérer les routes
  template: `
    <h1>Pokédex</h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
