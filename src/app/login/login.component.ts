import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { Usuario } from  '../usuario';
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
              private router: Router, 
              private formBuilder: FormBuilder ) 
              { }

  authForm!: FormGroup;
  isSubmitted  =  false;
  usuarioIncorrecto = false;

  usuario! : Usuario;

  ngOnInit(): void {
    this.authForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formControls() { 
    return this.authForm.controls; 
  }

  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    this.usuario = new Usuario();
    this.usuario.username = this.authForm.value.email;
    this.usuario.password = this.authForm.value.password;
    this.authService.signIn(this.usuario).subscribe(data => {
      this.usuarioIncorrecto = false;
      console.log(data);
      localStorage.setItem('ACCESS_TOKEN', data.access);
      localStorage.setItem('REFRESH_TOKEN', data.refresh);
      localStorage.setItem('USER_NAME', this.usuario.username);
      this.router.navigateByUrl('/')
    }, 
    error => {
      console.error('There was an error!', error);
      this.usuarioIncorrecto = true;
    });

  }

}
