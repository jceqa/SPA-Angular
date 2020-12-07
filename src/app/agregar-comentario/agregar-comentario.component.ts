import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Comentario } from '../comentario';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.sass']
})
export class AgregarComentarioComponent implements OnInit {

  id! : number;

  comentarioForm!: FormGroup;

  comentario! : Comentario;
  
  headers! : {};

  token! : string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private comentarioService : ComentarioService) {
    this.route.params.subscribe( 
      params =>
      this.id = params.id 
    );
  }

  ngOnInit(): void {
    this.comentarioForm  =  this.formBuilder.group({
      comentario: [''],
      calificacion: ['']
    });
  }

  guardar(){
    console.log(this.comentarioForm.value);
    this.comentario = new Comentario();
    this.comentario.calificacion = this.comentarioForm.value.calificacion;
    this.comentario.mensaje = this.comentarioForm.value.comentario;
    this.comentario.pelicula = this.id;
    console.log(localStorage.getItem('ACCESS_TOKEN'));
    this.token = JSON.stringify(localStorage.getItem('ACCESS_TOKEN') || "");
    //this.token = "fvWQCYvc44ejQySeJwxt7ntloExrcxd3BD6jTmSaH1dSGmdlbnwhuVw2LmhdvKSO";
    console.log(this.token);
    this.comentarioService.guardar(this.comentario, this.token).subscribe(data => {
      console.log(data);
      //this.router.navigateByUrl('/')
    }, 
    error => {
      console.error('There was an error!', error);
    });
  }

}
