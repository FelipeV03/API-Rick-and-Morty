import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RickyMortyService {

  constructor(private http: HttpClient) { }

  getRickyMorty() {
    const randomPage = Math.floor(Math.random() * 42) + 1; // generar un número aleatorio entre 1 y 43
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/?page=${randomPage}`);
  }
}

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class RickyMortyService {

//   constructor(private http: HttpClient) { }

//   getRickyMorty() {
//     const randomPage = Math.floor(Math.random() * 43) + 1; // generar un número aleatorio entre 1 y 43
//     const apiUrl = `https://rickandmortyapi.com/api/character/?page=${randomPage}`;
//     return this.http.get<any>(apiUrl);
//   }
// }



