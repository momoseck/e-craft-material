import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  user: User = new User();
  constructor(private authenticationservice: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get datas() {
    console.log('1111');
    return this.loginFormGroup.controls;
  }
  login(): void {
    this.user.username = this.datas.username.value;
    this.user.password = this.datas.password.value;
    this.authenticationservice.loginUser(this.user).subscribe(
      response => {
        const jwt = response.headers.get('Authorization');
        this.authenticationservice.saveToken(jwt);
        console.log(this.authenticationservice.getToken());
      }
    );
  }

}
