import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personaje } from '../../api.models';
import { RickyMortyService } from '../../services/ricky-morty.service';

@Component({
  selector: 'app-character-detail-modal',
  templateUrl: './character-detail-modal.component.html',
  styleUrls: ['./character-detail-modal.component.css']
})
export class CharacterDetailModalComponent implements OnInit {
  isFavorite = false;
  episodes: any[] = [];
  loadingEpisodes = false;

  constructor(
    public dialogRef: MatDialogRef<CharacterDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public character: Personaje,
    private rickyMortyService: RickyMortyService
  ) { }

  ngOnInit() {
    this.checkIfFavorite();
    this.loadEpisodes();
  }

  toggleFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(this.character.id);

    if (index > -1) {
      favorites.splice(index, 1);
      this.isFavorite = false;
    } else {
      favorites.push(this.character.id);
      this.isFavorite = true;
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  private checkIfFavorite() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.isFavorite = favorites.includes(this.character.id);
  }

  private loadEpisodes() {
    // Get first 5 episodes for preview
    const episodeUrls = this.character.episode?.slice(0, 5) || [];
    if (episodeUrls.length === 0) return;

    this.loadingEpisodes = true;
    const ids = episodeUrls.map((url: string) => url.split('/').pop()).join(',');

    this.rickyMortyService.getEpisodes(ids).subscribe({
      next: (data) => {
        this.episodes = Array.isArray(data) ? data : [data];
      },
      error: (err) => console.error('Error loading episodes:', err),
      complete: () => this.loadingEpisodes = false
    });
  }

  close() {
    this.dialogRef.close();
  }
}
