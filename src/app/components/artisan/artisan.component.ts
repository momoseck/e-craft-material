import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Artisan } from 'src/app/models/Artisan';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { Compte } from 'src/app/models/Compte';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-artisan',
  templateUrl: './artisan.component.html',
  styleUrls: ['./artisan.component.css']
})
export class ArtisanComponent implements OnInit {
  appUser: Compte = null;
  displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'genre', 'profession', 'repertoire', 'departement', 'status'];
  dataSource = new MatTableDataSource<Artisan>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private authservice: AuthenticationService,private chambreService: ChambreManagerService) { }

  ngOnInit() {
    this.appUser = this.authservice.loadUser();
    this.dataSource.paginator = this.paginator;
    this.chambreService.getArtisan().subscribe(
      dataArtisan => {
        this.dataSource.data = dataArtisan;
        console.log(this.dataSource.data);
      }
    );
  }

}
