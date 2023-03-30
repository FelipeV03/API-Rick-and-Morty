import { Component } from '@angular/core';
import { RickyMortyService } from './services/ricky-morty.service';
import { Personaje } from './api.models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Api Ricky Morty';

  rickyMorty: Personaje[] = [];
  filtrercaracter: Personaje[] = [];
  searchcaracter: any = '';
  loading = true;

  constructor(private rickyMortyService: RickyMortyService) { }



  // Aca se obtiene la info de la API y se muestra en la vista html
  ngOnInit() {
    this.loading = true; // Establecer en true antes de cargar los datos
    this.rickyMortyService.getRickyMorty().subscribe({
      next: (data) => {
        // console.log(data);
        this.rickyMorty = <any>data.results;
        this.filtrercaracter = data.results;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('Info de la API obtenida con éxito');
        this.loading = false; // Establecer en false después de cargar los datos
      }
    });
  }


  // Aca se filtra la info de la API para poder buscarlo en la barra de busqueda y se muestra en la vista html
  search() {
    // console.log(this.searchcaracter);
    this.filtrercaracter = this.rickyMorty.filter((personaje) =>
      personaje.name.toLowerCase().includes(this.searchcaracter.toLowerCase())
    );
    // this.filtrercaracter = this.rickyMorty.filter((personaje) =>
    //   personaje.status.toLowerCase().includes(this.searchcaracter.toLowerCase())
    // );
    // this.filtrercaracter = this.rickyMorty.filter((personaje) =>
    //   personaje.species.toLowerCase().includes(this.searchcaracter.toLowerCase())
    // );
  }
}