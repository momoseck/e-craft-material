import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Compte } from 'src/app/models/Compte';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  user: Compte = new Compte();
  constructor(private authenticationservice: AuthenticationService,private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get datas() {
    
    return this.loginFormGroup.controls;
  }
  login(): void {
    this.user.username = this.datas.username.value;
    this.user.password = this.datas.password.value;
    this.authenticationservice.loginUser(this.user).subscribe(
      response => {
        const jwt = response.headers.get('Authorization');
        this.authenticationservice.saveToken(jwt);
         
        this.router.navigate(['']);
      }
    );
  }

}
