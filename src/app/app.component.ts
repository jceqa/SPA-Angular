import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  
  title = 'SPA';
  
  usuario = "Invitado";

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void{
    //this.usuario = JSON.parse(localStorage.getItem('USER_NAME') || 'Invitado');
  }
}
