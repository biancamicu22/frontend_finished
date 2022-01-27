import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { Utilizator } from '../shared/utilizator.model';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { UserLogin } from '../shared/userLogin.model';
import { UtilizatorLogat } from '../shared/UtilizatorLogat';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean;
  submitted = false;
  loading = false;
  loginError: string;
  loginForm: FormGroup;
  registerForm: FormGroup;
  inLogin = true;
  inRegister = false;
  utilizatori: Utilizator[] = [];
  success: boolean;
  user: UserLogin = {
    password: "",
    username: ""
  }
  userCreare : Utilizator = {
    id : null,
    username : "",
    nume : "",
    prenume : "",
    email : "",
    telefon : "",
    parola : "",
    fotografie : null,
    rezervare : null,
    role : ""
  }
  userLogat: UtilizatorLogat;

  constructor(private api: UserService, private fb: FormBuilder, private router: Router, private data: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required]],
      parola: [null, Validators.required]
    });

    this.registerForm = this.fb.group({
      nume: [null, Validators.required],
      prenume: [null, Validators.required],
      email: [null, [Validators.required]],
      telefon: [null],
      username: [null, Validators.required],
      parola: [null, Validators.required]
    });
  }

  ngOnDestroy() {
  }

  get f() { return this.loginForm.controls; }

  get f1() { return this.registerForm.controls; }

  onLoginSubmit() {

    this.submitted = true;
    this.loading = true
    this.user.password = this.loginForm.get('parola').value;
    this.user.username = this.loginForm.get('email').value;
    this.api.login(this.user).subscribe((res => {
      if (res != null) {
        this.loginForm.reset()
        setTimeout(() => {
          this.success = null;
        }, 3000);
        this.router.navigate(['']);
      }
      else {
        this.loginError = "Nu s-a putut realiza logarea. Va rugam sa incercati din nou!";
        this.loading = false;
      }
    }));
  }

  onRegisterSubmit() {

    this.submitted = true;
    this.loading = true;
    console.log(this.registerForm.value);
    this.userCreare.email = this.registerForm.get('email').value
    this.userCreare.nume = this.registerForm.get('nume').value
    this.userCreare.prenume = this.registerForm.get('prenume').value
    this.userCreare.telefon = this.registerForm.get('telefon').value
    this.userCreare.username = this.registerForm.get('username').value
    this.userCreare.parola = this.registerForm.get('parola').value
    this.api.addUtilizator(this.registerForm.value).subscribe(() => {

      this.registerForm.reset();
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
      this.router.navigate(['']);
    },
      (error: Error) => {
        console.log(error);
        this.registerForm.reset();
        this.success = false;
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });
  }
}
