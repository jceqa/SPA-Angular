import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pelicula } from '../pelicula';
import { PeliculaService } from '../pelicula.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.sass']
})
export class PeliculaComponent implements OnInit {

  peliculas: Pelicula[] = [];

  pagina : number = 0;
  maxPaginas : number = 0;

  totalPaginas!: Array<number>;

  totalPeliculas!: number;

  numeroResultados : number = 10;
  cantidadResultados = [5, 10, 20, 50];

  isFirst : boolean = false;
  isLast : boolean = false;

  constructor(private peliculaService: PeliculaService, 
              private router: Router, 
              private route: ActivatedRoute,
              private SpinnerService: NgxSpinnerService) 
              { }

  ngOnInit(): void {
    this.cargarPeliculas();
  }

  cargarPeliculas(){
    this.SpinnerService.show();
    this.peliculaService.listPeliculas(this.numeroResultados, this.pagina*this.numeroResultados).subscribe(
      data => {
        this.totalPeliculas = data.count;
        this.peliculas = data.results;
        this.totalPaginas = new Array(Math.ceil(this.totalPeliculas/this.numeroResultados));
        this.maxPaginas = Math.floor(this.totalPeliculas/this.numeroResultados);
        this.SpinnerService.hide(); 
      },
      err => {
        console.log(err.error);
        this.SpinnerService.hide(); 
      }
    );
  }

  siguiente(): void{
    this.pagina++;
    this.cargarPeliculas();
  }

  anterior(): void{
    this.pagina--;
    this.cargarPeliculas();
  }

  setearPagina(pagina: number) : void{
    this.pagina = pagina;
    this.cargarPeliculas();
  }

  cambiarNumeroPeliculas(event : any): void {
    this.numeroResultados = event.target.value;
    this.pagina = 0;
    this.cargarPeliculas();
  }

  obtenerId(titulo : string) {
    for (var p in PeliculaEnum){
      if(p === titulo){
        this.detalles(Number(PeliculaEnum[p]));
        break;
      }
    } 
  }

  detalles(id : number){
    this.router.navigate([`detalles/${id}`], { relativeTo: this.route });
  }
  
}

/**
 * Enumerado para identificar peliculas,
 * ya que el servicio no devuelve el identificador
 * de las mismas.
 */
enum PeliculaEnum {
  "Crepusculo" = 1,
  "THE MEG" = 2,
  "El imperio contraataca" = 3,
  "Jurassic World" = 4,
  "En busca del arca perdida" = 5,
  "LA BESTIA" = 6,
  "Regreso al futuro" = 7,
  "Mi nombre es KHAN" = 8,
  "La tumba de las luciérnagas" = 9,
  "MOSUL" = 10,
  "Buscando a Nemo" = 11,
  "El resplandor" = 12,
  "Buscando a Dory" = 13,
  "El retorno del Jedi" = 14,
  "Hasta el ultimo hombre" = 15,
  "PARKER" = 16,
  "Piratas del Caribe" = 17,
  "Aliens, el regreso" = 18,
  "PROTEGIENDO AL ENEMIGO" = 19,
  "La Monja" = 20,
  "El precio del poder" = 21,
  "El conjuro" = 22,
  "Anabelle" = 23,
  "Amadeus" = 24,
  "CHICAS PESADAS" = 25,
  "Insidious" = 26,
  "LA LISTA DE AL CARAJO" = 27,
  "Yo antes de ti" = 28,
  "SON COMO NIÑOS" = 29,
  "Rápido y Furioso" = 30,
  "HITCH: ESPECIALISTA EN SEDUCCION" = 31,
  "VIVIENDO CON MI EX" = 32
}