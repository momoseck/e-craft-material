import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Demande } from 'src/app/models/Demande';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { Observable } from 'rxjs/internal/Observable';
import { Inject } from '@angular/core';
import { Professions } from 'src/app/models/Professions';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Personne } from 'src/app/models/Personne';
import { Artisan } from 'src/app/models/Artisan';
import { Repertoire } from 'src/app/models/Repertoire';
import { Departement } from 'src/app/models/Departement';

@Component({
  selector: 'app-traitement-demande',
  templateUrl: './traitement-demande.component.html',
  styleUrls: ['./traitement-demande.component.css']
})
export class TraitementDemandeComponent implements OnInit, OnChanges {

  // tslint:disable-next-line:ban-types
  show: String = 'a';
  isOptional = false;
  isDisabled = true;
  displayedColumns: string[] = ['idDemande', 'prenom', 'nom', 'adress', 'genre', 'CNI', 'statut'];
  dataSourceDemande = new MatTableDataSource<Demande>();
  dataSourceChambre = new MatTableDataSource<Demande>();
  dataSourceGouvernance = new MatTableDataSource<Demande>();
  demande: Demande;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chambreService: ChambreManagerService, private dialog: MatDialog) { }

  ngOnInit() {
    this.initDemandes();
  }
  show1() {
    this.show = 'a';
  }
  show2() {
    this.show = 'b';
  }
  show3() {
    this.show = 'c';
  }
  getDemandes() {
    this.dataSourceDemande.paginator = this.paginator;
    this.chambreService.getDemande().subscribe(
      datademande => {
        this.dataSourceDemande.data = datademande;
      }
    );
  }
  getDemandeCh() {
    this.dataSourceDemande.paginator = this.paginator;
    this.chambreService.getDemandeCh().subscribe(
      datademande => {
        this.dataSourceChambre.data = datademande;
      }
    );
  }
  getDemandeGov() {
    this.dataSourceDemande.paginator = this.paginator;
    this.chambreService.getDemandeGov().subscribe(
      datademande => {
        this.dataSourceGouvernance.data = datademande;
      }
    );
  }
  initDemandes() {
    this.getDemandes();
    this.getDemandeCh();
    this.getDemandeGov();
    console.log('inittttt---');
  }
  isSelected(getdemande: Demande) {

    if (getdemande.selected) {
      getdemande.selected = !getdemande.selected;
      this.isDisabled = !this.isDisabled;
    } else {
      for (const demand of this.dataSourceDemande.data) {
        demand.selected = false;
      }
      getdemande.selected = !getdemande.selected;
      this.isDisabled = false;
      this.demande = getdemande;
      console.log('id demande 2222' + this.demande.adresse);
    }


  }
  openDialog() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '400px',
      width: '600px',
      data: this.demande
    });
    dialogRef.afterClosed().subscribe(result => {
      this.initDemandes();
    });
  }
  private refreshTable() {
    this.getDemandes();
  }
  ngOnChanges(changes): void {
    console.log('change ' + this.dataSourceDemande.data);
  }
}
// COMPONENT DIALOG
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'view-dialog.html',
})
export class ConfirmationDialogComponent {
  profession: Professions;
  personne: Personne = new Personne();
  artisan: Artisan = new Artisan();
  repertoire: Repertoire = new Repertoire();
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Demande,
    private adminService: AdminManagerService, private chambreService: ChambreManagerService) {
    this.adminService.getProfession(data.profession).subscribe(
      prof => {
        this.profession = prof;
      }
    );
  }

  validationChambre(): void {
    this.data.statutdemande = 1;
    this.data.selected = false;
    this.chambreService.updateDemande(this.data).subscribe(
      resp => {
        console.log('coooll');

      }, err => {
        console.log(err);
      }
    );
  }
  createDataArt() {
    // Personne data
    const departement = new Departement();
    departement.iddepartement = this.data.iddepartement;
    this.repertoire.departement = departement;
    this.chambreService.postRepertoire(this.repertoire)
      .subscribe(response => {
        this.repertoire = response;
      });

    this.personne.numeroutilisateur = 'user';
    this.personne.nom = this.data.nom;
    this.personne.prenom = this.data.prenom;
    this.personne.datenaissance = this.data.datenaissance;
    this.personne.adresse = this.data.adresse;
    this.personne.genre = this.data.genre;
    this.personne.email = this.data.email;
    this.personne.telephone = this.data.telephone;
    // Artisan Data
    this.artisan.numeroutilisateur = 'user';
    this.artisan.personne = this.personne;
    this.artisan.adressprof = this.data.adressprof;
    this.artisan.dateinscrit = this.data.dateinscrit;
    this.artisan.professions = new Professions();
    this.artisan.professions.idprofession = this.profession.idprofession;
    this.artisan.repertoire = this.repertoire;
  }
  validationGouvernance(): void {
    this.data.statutdemande = 2;
    this.data.selected = false;
    this.chambreService.updateDemande(this.data).subscribe(
      resp => {
        console.log('coooll');

      }, err => {
        console.log(err);
      }
    );
  }
}
