import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarComentarioComponent } from './agregar-comentario/agregar-comentario.component';
import { DetallesComponent } from './detalles/detalles.component';
import { LoginComponent } from './login/login.component';
import { PeliculaComponent } from './pelicula/pelicula.component';

const routes: Routes = [
  {path: '', component: PeliculaComponent},
  {path: 'detalles/:id', component: DetallesComponent},
  {path: 'nuevo-comentario/:id', component : AgregarComentarioComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
