import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasToken = false;
  constructor(private authenticationservice: AuthenticationService) { }
  ngOnInit(): void {
    this.hasToken = this.authenticationservice.hasToken();
  }
}
