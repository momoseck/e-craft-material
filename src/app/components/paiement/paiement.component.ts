import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Artisan } from 'src/app/models/Artisan';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { ViewChild } from '@angular/core';
import { Paiement } from 'src/app/models/Paiement';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Chambremetier } from 'src/app/models/Chambremetier';
import { Compte } from 'src/app/models/Compte';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  appUser: Compte = null;
  isDisabled = true;
  isOptional = false;
  professions: string[] = [];
  artisan: Artisan;
  filterFormGroup: FormGroup;
  displayedColumns: string[] = ['code', 'prenom', 'nom', 'adress', 'genre', 'telephone', 'profession', 'etat'];
  dataSource = new MatTableDataSource<Artisan>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private authservice: AuthenticationService, private chambreService: ChambreManagerService,
    // tslint:disable-next-line:align
    private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.appUser = this.authservice.loadUser();

    this.dataSource.paginator = this.paginator;
    this.filterFormGroup = this.formBuilder.group({
      prenom: '',
      nom: '',
      profession: ''
    });
    this.chambreService.getArtisan().subscribe(
      response => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
        for (let i = 0; i < this.dataSource.data.length; i++) {
          this.dataSource.data[i].nom = this.dataSource.data[i].personne.nom;
          this.dataSource.data[i].prenom = this.dataSource.data[i].personne.prenom;
          this.dataSource.data[i].profession = this.dataSource.data[i].professions.professionName;
          if (!this.professions.includes(this.dataSource.data[i].profession)) {
            this.professions.push(this.dataSource.data[i].profession);
          }
        }
      }
    );
    // this.dataSource.filterPredicate = (data: Artisan, filter: string) => {
    //   return data.personne.nom === filter;
    // };
    // this.dataSource.filter = myValue;
    this.dataSource.filterPredicate =
      (data: Artisan, filtersJson: string) => {
        if (filtersJson !== '') {
          const matchFilter = [];
          const filters = JSON.parse(filtersJson);

          filters.forEach(filter => {
            const val = data[filter.id] === null ? '' : data[filter.id];
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          });
          return matchFilter.every(Boolean);
        }
      };
    // this.getArtisan();
  }

  getArtisan() {

  }
  applyFilter() {

    // this.dataSource.filter = filterValue.trim().toLowerCase();
    const tableFilters = [];
    if (this.filterFormGroup.controls.prenom.value !== undefined) {
      console.log('prenom=' + this.filterFormGroup.controls.prenom.value);
      tableFilters.push({
        id: 'prenom',
        value: this.filterFormGroup.controls.prenom.value
      });
    }
    if (this.filterFormGroup.controls.nom.value !== undefined) {
      console.log('nom=' + this.filterFormGroup.controls.nom.value);
      tableFilters.push({
        id: 'nom',
        value: this.filterFormGroup.controls.nom.value
      });
    }
    if (this.filterFormGroup.controls.profession.value !== undefined) {
      console.log('profession=' + this.filterFormGroup.controls.profession);
      tableFilters.push({
        id: 'profession',
        value: this.filterFormGroup.controls.profession.value
      });
    }
    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isSelected(getArtisan: Artisan) {

    if (getArtisan.selected) {
      getArtisan.selected = !getArtisan.selected;
      this.isDisabled = !this.isDisabled;
    } else {
      for (const artisan of this.dataSource.data) {
        artisan.selected = false;
      }
      getArtisan.selected = !getArtisan.selected;
      this.isDisabled = false;
      this.artisan = getArtisan;
    }

  }

  openDialog() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(PaiementDialogComponent, {
      height: '400px',
      width: '600px',
      data: this.artisan
    });
    dialogRef.afterClosed().subscribe(result => {
      this.artisan.selected = false;
    });
  }

}


// COMPONENT DIALOG
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'paiement-dialog.html',
})
export class PaiementDialogComponent {
  paiement: Paiement = new Paiement();
  artisan: Artisan = new Artisan();
  paiementFormGroup: FormGroup;
  // chambremetier: Chambremetier = new Chambremetier();
  constructor(
    public dialogRef: MatDialogRef<PaiementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Artisan, public chambreService: ChambreManagerService,
    // tslint:disable-next-line:align
    private formBuilder: FormBuilder) {

    console.log(this.paiement);
    this.artisan.numeroutilisateur = this.data.numeroutilisateur;
    this.paiementFormGroup = this.formBuilder.group({
      montant: ['', Validators.required]
    });
  }

  validation(): void {
    this.paiement.idpaiement = 1;
    this.paiement.datepaiement = '01-01-2019';
    this.paiement.montant = +this.paiementFormGroup.controls.montant.value;
    this.paiement.artisan = this.artisan;
    this.data.selected = false;
    // console.log('11111 ' + this.data.repertoire.departement.region.gouvernances[0].chambremetiers[0]);
    console.log(this.paiement);
    this.chambreService.postPaiement(this.paiement).subscribe(
      ressponse => {
        console.log(' sdsdsds' + this.paiement);
      }, err => {
        console.log(err);
      }
    );
  }

}
