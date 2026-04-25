import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickyMortyService {
  private readonly BASE = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  getCharacters(page: number, name = '', status = '', gender = '') {
    const params: string[] = [`page=${page}`];
    if (name.trim())   params.push(`name=${encodeURIComponent(name.trim())}`);
    if (status)        params.push(`status=${encodeURIComponent(status)}`);
    if (gender)        params.push(`gender=${encodeURIComponent(gender)}`);
    return this.http.get<any>(`${this.BASE}character/?${params.join('&')}`);
  }

  getCharacterById(id: number) {
    return this.http.get<any>(`${this.BASE}character/${id}`);
  }

  getEpisodes(ids: string) {
    return this.http.get<any>(`${this.BASE}episode/${ids}`);
  }
}
