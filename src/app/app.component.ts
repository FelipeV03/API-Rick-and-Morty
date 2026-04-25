import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RickyMortyService } from './services/ricky-morty.service';
import { Personaje } from './api.models';
import { CharacterDetailModalComponent } from './components/character-detail-modal/character-detail-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  filtrercaracter: Personaje[] = [];
  loading = true;

  currentPage = 1;
  totalPages = 1;
  totalCharacters = 0;

  nameSearch = '';
  selectedStatus = '';
  selectedGender = '';

  favorites: Set<number> = new Set();

  private searchSubject = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(
    private rickyMortyService: RickyMortyService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadFavorites();
    this.loadPage(1);

    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.loadPage(1));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get pageNumbers(): number[] {
    const range = 2;
    const start = Math.max(1, this.currentPage - range);
    const end = Math.min(this.totalPages, this.currentPage + range);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  get hasActiveFilters(): boolean {
    return !!(this.nameSearch || this.selectedStatus || this.selectedGender);
  }

  loadPage(page: number) {
    this.loading = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.rickyMortyService
      .getCharacters(page, this.nameSearch, this.selectedStatus, this.selectedGender)
      .subscribe({
        next: (data) => {
          this.filtrercaracter = data.results ?? [];
          this.currentPage = page;
          this.totalPages = data.info?.pages ?? 1;
          this.totalCharacters = data.info?.count ?? 0;
        },
        error: () => {
          this.filtrercaracter = [];
          this.totalPages = 0;
          this.totalCharacters = 0;
        },
        complete: () => { this.loading = false; }
      });
  }

  onSearchInput() {
    this.searchSubject.next();
  }

  clearSearch() {
    this.nameSearch = '';
    this.loadPage(1);
  }

  toggleStatus(status: string) {
    this.selectedStatus = this.selectedStatus === status ? '' : status;
    this.loadPage(1);
  }

  toggleGender(gender: string) {
    this.selectedGender = this.selectedGender === gender ? '' : gender;
    this.loadPage(1);
  }

  clearAllFilters() {
    this.nameSearch = '';
    this.selectedStatus = '';
    this.selectedGender = '';
    this.loadPage(1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.loadPage(this.currentPage + 1);
  }

  previousPage() {
    if (this.currentPage > 1) this.loadPage(this.currentPage - 1);
  }

  isFavorite(id: number): boolean {
    return this.favorites.has(id);
  }

  toggleFavorite(character: Personaje, event: Event) {
    event.stopPropagation();
    if (this.favorites.has(character.id)) {
      this.favorites.delete(character.id);
    } else {
      this.favorites.add(character.id);
    }
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  selectCharacter(personaje: Personaje) {
    this.dialog.open(CharacterDetailModalComponent, {
      data: personaje,
      width: '580px',
      maxWidth: '95vw',
      panelClass: 'character-detail-dialog',
      backdropClass: 'dialog-backdrop'
    });
  }

  private loadFavorites() {
    const stored = localStorage.getItem('favorites');
    if (stored) this.favorites = new Set(JSON.parse(stored));
  }
}
