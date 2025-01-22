import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';

export const routes: Routes = [
  { path: '', component: PokemonListComponent }, // Route pour la liste des Pokémon
  { path: 'pokemon/:name', component: PokemonDetailComponent }, // Route pour les détails d'un Pokémon
];