import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss'],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any; // Les détails du Pokémon

  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de la route
    private pokemonService: PokemonService // Pour récupérer les données
  ) {}

  ngOnInit(): void {
    // Récupérer le nom du Pokémon depuis l'URL
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      // Appeler le service pour obtenir les détails du Pokémon
      this.pokemonService.getPokemonDetails(name).subscribe((data) => {
        this.pokemon = data; // Stocker les données du Pokémon
      });
    }
  }
}
