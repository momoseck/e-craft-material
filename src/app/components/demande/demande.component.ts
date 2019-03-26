import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Demande } from 'src/app/models/Demande';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Personne } from 'src/app/models/Personne';
import { Artisan } from 'src/app/models/Artisan';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { Professions } from 'src/app/models/Professions';
import { formatNumber } from '@angular/common/src/i18n/format_number';
import { Repertoire } from 'src/app/models/Repertoire';
import { Region } from 'src/app/models/Region';
import { Departement } from 'src/app/models/Departement';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  demandeFormGroup: FormGroup;
  personnFormGroup: FormGroup;
  artisanFormGroup: FormGroup;
  demande: Demande = new Demande();

  departement: Departement;
  professions: Professions[];
  departements: Departement[];
  isOptional = false;
  displayedColumns: string[] = ['idDemande', 'prenom', 'nom', 'adress', 'genre', 'CNI', 'statut'];
  dataSource = new MatTableDataSource<Demande>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chambreService: ChambreManagerService, private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private adminservice: AdminManagerService) { }

  ngOnInit() {
    this.getDemandes();
    // formGroup personn
    this.personnFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      datenaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      genre: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required]
    });
    // formGroup demande
    this.demande.iddemande = 1;
    this.demande.statudemande = 0;
    this.demandeFormGroup = this.formBuilder.group({
      departementid: ['', Validators.required],
      justificatif: ['', Validators.required],
      cni: ['', Validators.required],
      photo: ['', Validators.required]
    });
    // formGroup artisan

    // const datePipe = new DatePipe('en-US');
    // this.artisan.dateinscrit = datePipe.transform('01/04/2017', 'dd/MM/yyyy');
    this.artisanFormGroup = this.formBuilder.group({
      professionid: ['', Validators.required],
      adressprof: ['', Validators.required],
      experiencepro: ['', Validators.required]
    });

    this.adminservice.getProfessions().subscribe(
      listProfession => {
        this.professions = listProfession;
      }
    );

    this.adminservice.getDepartements().subscribe(
      listDepartements => {
        this.departements = listDepartements;
      }
    );

  }
  get dem() {
    console.log('get get get ====>');
    return this.getDemandes();
  }

  getDemandes() {
    this.dataSource.paginator = this.paginator;
    this.chambreService.getDemande().subscribe(
      datademande => {
        this.dataSource.data = datademande;
      }
    );
  }
  dataGroup() {
    const personnData = this.personnFormGroup.controls;
    const demandeData = this.demandeFormGroup.controls;
    const artisanData = this.artisanFormGroup.controls;
    // persone data
    this.demande.nom = personnData.nom.value;
    this.demande.prenom = personnData.prenom.value;
    this.demande.datenaissance = personnData.datenaissance.value;
    this.demande.adresse = personnData.adresse.value;
    this.demande.genre = personnData.genre.value;
    this.demande.email = personnData.email.value;
    this.demande.telephone = personnData.telephone.value;
    // demande data
    this.demande.justificatif = demandeData.justificatif.value;
    this.demande.cni = demandeData.cni.value;
    this.demande.photo = demandeData.photo.value;

    // Data mapping
    this.departement = this.getDepartement(+demandeData.departementid.value);
    this.demande.chambremetier = this.departement.region.gouvernances[0].chambremetiers[0];
    // artisan data
    this.demande.adressprof = artisanData.experiencepro.value;
    this.demande.expreriencepro = artisanData.experiencepro.value;
    this.demande.profession = artisanData.professionid.value;
    this.demande.dateinscrit = '02-08-2019';
  }
  getDepartement(id: number): Departement {
    if (this.departements != null) {
      const deparray = this.departements;
      for (const dep of deparray) {
        if (dep.iddepartement === id) {
          return dep;
        }
      }
    }
    return null;
  }
  postDemande() {
    this.dataGroup();
    this.chambreService.postDemande(this.demande).subscribe(
      rep => {
        console.log(rep);
        this.getDemandes();
      }, err => {
        console.log(err);
      }
    );

    // this.dataSource.data.pop(this.demande);
  }

}
