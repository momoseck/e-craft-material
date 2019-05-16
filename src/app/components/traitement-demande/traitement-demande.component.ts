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
import { Compte } from 'src/app/models/Compte';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';

@Component({
  selector: 'app-traitement-demande',
  templateUrl: './traitement-demande.component.html',
  styleUrls: ['./traitement-demande.component.css']
})
export class TraitementDemandeComponent implements OnInit, OnChanges {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // tslint:disable-next-line:ban-types
  show: String = 'a';
  isOptional = false;
  appUser: Compte = null;
  isDisabled = true;
  displayedColumns: string[] = ['idDemande', 'prenom', 'nom', 'adress', 'genre', 'CNI', 'statut'];
  dataSourceDemande = new MatTableDataSource<Demande>();
  dataSourceChambre = new MatTableDataSource<Demande>();
  dataSourceGouvernance = new MatTableDataSource<Demande>();
  demande: Demande;


  constructor(private authservice: AuthenticationService, private chambreService: ChambreManagerService, private dialog: MatDialog) { }

  ngOnInit() {
    const page1 = this.paginator.toArray();
    console.log(' icici' + this.paginator);
    this.authservice.load().subscribe(
      response => {
        this.appUser = response;
        const datas = [];
        if (this.appUser.agentchambre != null) {
          const copyChambre = [];
          const copyGouv = [];
          const copyDemande = [];
          const demandeCopy = this.appUser.agentchambre.chambremetier.demandes;
          for (let i = 0; i < demandeCopy.length; i++) {
            if (demandeCopy[i].statutdemande === 0) {
              copyDemande.push(demandeCopy[i]);
            } else if (demandeCopy[i].statutdemande === 1) {
              copyChambre.push(demandeCopy[i]);
            } else if (demandeCopy[i].statutdemande === 2) {
              copyGouv.push(demandeCopy[i]);
            }

          }
          this.dataSourceDemande.data = copyDemande;
          this.dataSourceDemande.paginator = page1[0];

          this.dataSourceChambre.data = copyChambre;
          this.dataSourceChambre.paginator = page1[1];

          this.dataSourceGouvernance.data = copyGouv;
          this.dataSourceGouvernance.paginator = page1[2];
          console.log(' icici' + this.paginator.toArray());
        } else if (this.appUser.agentgouvernance != null) {
          const copyChambre = [];
          const copyGouv = [];
          const copyDemande = [];
          const demandeCopy = this.appUser.agentgouvernance.gouvernance.chambremetiers[0].demandes;
          for (let i = 0; i < demandeCopy.length; i++) {
            if (demandeCopy[i].statutdemande === 0) {
              copyDemande.push(demandeCopy[i]);
            } else if (demandeCopy[i].statutdemande === 1) {
              copyChambre.push(demandeCopy[i]);
            } else if (demandeCopy[i].statutdemande === 2) {
              copyGouv.push(demandeCopy[i]);
            }

          }
          this.dataSourceDemande.data = copyDemande;
          this.dataSourceDemande.paginator = this.paginator.toArray()[0];

          this.dataSourceChambre.data = copyChambre;
          this.dataSourceChambre.paginator = this.paginator.toArray()[1];

          this.dataSourceGouvernance.data = copyGouv;
          this.dataSourceGouvernance.paginator = this.paginator.toArray()[2];

        } else {
          // this.getDemandes();
          this.chambreService.getDemande().subscribe(
            datademande => {
              this.dataSourceDemande.data = datademande;
              this.dataSourceDemande.paginator = this.paginator.toArray()[0];
              console.log(this.dataSourceDemande);
            }
          );

          this.chambreService.getDemandeCh().subscribe(
            datademande => {
              this.dataSourceChambre.data = datademande;
              this.dataSourceChambre.paginator = this.paginator.toArray()[1];
            }
          );
          this.chambreService.getDemandeGov().subscribe(
            datademande => {
              this.dataSourceGouvernance.data = datademande;
              this.dataSourceGouvernance.paginator = this.paginator.toArray()[2];
            }
          );
        }
        console.log(this.appUser);
      }, err => {

      }
    );
  }
  show1() {
    this.show = 'a';
    this.ngOnInit();
  }
  show2() {
    this.show = 'b';
    this.ngOnInit();
  }
  show3() {
    this.show = 'c';
    this.dataSourceGouvernance.paginator = this.paginator.toArray()[2];
    this.ngOnInit();
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
      this.chambreService.getOneDemande(this.demande.iddemande).subscribe(
        response => {
          this.demande.chambremetier = response.chambremetier;
        }
      );
      console.log('id demande 2222' + this.demande.adresse);
    }
  }
  openDialog() {
    this.isDisabled = true;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '500px',
      width: '800px',
      data: this.demande
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  private refreshTable() {
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
  appUser: Compte = null;
  profession: Professions;
  personne: Personne = new Personne();
  artisan: Artisan = new Artisan();
  repertoire: Repertoire = new Repertoire();
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Demande, private authservice: AuthenticationService,
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
