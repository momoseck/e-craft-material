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

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  isDisabled = true;
  isOptional = false;
  artisan: Artisan;
  displayedColumns: string[] = ['code', 'prenom', 'nom', 'adress', 'genre', 'telephone', 'profession'];
  dataSource = new MatTableDataSource<Artisan>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chambreService: ChambreManagerService,
    // tslint:disable-next-line:align
    private dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getArtisan();
  }

  getArtisan() {
    this.chambreService.getArtisan().subscribe(
      response => {
        this.dataSource.data = response;
      }
    );
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = ('' + filterValue).trim().toLowerCase();
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
