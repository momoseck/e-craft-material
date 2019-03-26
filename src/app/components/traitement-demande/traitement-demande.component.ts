import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { Demande } from 'src/app/models/Demande';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { Observable } from 'rxjs/internal/Observable';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-traitement-demande',
  templateUrl: './traitement-demande.component.html',
  styleUrls: ['./traitement-demande.component.css']
})
export class TraitementDemandeComponent implements OnInit {
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

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      height: '400px',
      width: '600px',
      data: this.demande
    });
    console.log(this.demande.iddemande);
  }
}
// COMPONENT DIALOG
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'view-dialog.html',
})
export class ConfirmationDialogComponent {
  iddemande = 11;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Demande) { }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

}
