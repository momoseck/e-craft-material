import { Component, OnInit, ViewChild } from '@angular/core';
import { Departement } from 'src/app/models/Departement';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  appUser = null;
  displayedColumns: string[] = ['id', 'departement', 'region'];
  dataSource = new MatTableDataSource<Departement>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private authservice: AuthenticationService, private adminManagerService: AdminManagerService) {
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.adminManagerService.getDepartements().subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
    this.appUser = this.authservice.loadUser();
  }

}
