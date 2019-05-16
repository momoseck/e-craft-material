import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Compte } from 'src/app/models/Compte';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  loginFormGroup: FormGroup;
  user: Compte = new Compte();
  appUser: Compte = null;
  hasToken = false;
  nomStructure: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
    map(result => result.matches)
    );

  constructor(private authservice: AuthenticationService, private formBuilder: FormBuilder,
    private router: Router, private breakpointObserver: BreakpointObserver) {
      this.loginFormGroup = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });

  }
  ngOnInit(): void {
    
    this.hasToken = this.authservice.hasToken();
    this.authservice.load().subscribe(
      response => {
        this.appUser = response;
        if (this.appUser.agentchambre != null) {

          this.appUser.nomStructure = this.appUser.agentchambre.chambremetier.nomchambre;
        } else if (this.appUser.agentgouvernance != null) {
          this.appUser.nomStructure = this.appUser.agentgouvernance.gouvernance.nomgouvernance;
        } else {
          this.appUser.nomStructure = this.appUser.username;

        }
        this.nomStructure = this.appUser.nomStructure;

      }, err => {

      }
    );
    
  }
  logOut() {
    this.authservice.logOut();
    this.hasToken = false;

    this.router.navigate(['']);
  }
  get datas() {

    return this.loginFormGroup.controls;
  }
  login(): void {
    this.user.username = this.datas.username.value;
    this.user.password = this.datas.password.value;
    this.authservice.loginUser(this.user).subscribe(
      response => {
        const jwt = response.headers.get('Authorization');
        this.authservice.saveToken(jwt);
        this.authservice.load().subscribe(
          resp => {
            this.appUser = resp;
            if (this.appUser.agentchambre != null) {

              this.appUser.nomStructure = this.appUser.agentchambre.chambremetier.nomchambre;
            } else if (this.appUser.agentgouvernance != null) {
              this.appUser.nomStructure = this.appUser.agentgouvernance.gouvernance.nomgouvernance;
            } else {
              this.appUser.nomStructure = this.appUser.username;

            }
            this.nomStructure = this.appUser.nomStructure;

          }, err => {

          }
        );
        this.hasToken = this.authservice.hasToken();
      }
    );
  }
}
