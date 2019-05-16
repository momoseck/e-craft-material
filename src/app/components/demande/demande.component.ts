import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Location } from '@angular/common';
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
import { Compte } from 'src/app/models/Compte';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Chambremetier } from 'src/app/models/Chambremetier';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  appUser: Compte = null;
  demandeFormGroup: FormGroup;
  personnFormGroup: FormGroup;
  artisanFormGroup: FormGroup;
  demande: Demande = new Demande();
  demandes: Demande[] = [];
  departement: Departement;
  professions: Professions[];
  departements: Departement[];
  chambreFocus: Chambremetier = new Chambremetier();
  justificatif: any = File;
  photo: any = File;
  isOptional = false;
  displayedColumns: string[] = ['idDemande', 'prenom', 'nom', 'date', 'adress', 'genre', 'CNI', 'statut'];
  dataSource = new MatTableDataSource<Demande>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private location: Location,
    private authservice: AuthenticationService, private chambreService: ChambreManagerService, private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private adminservice: AdminManagerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    console.log(this.dataSource.paginator);
    this.authservice.load().subscribe(
      response => {
        this.appUser = response;
        const datas = [];
        if (this.appUser.agentchambre != null) {

           this.dataSource.data = this.appUser.agentchambre.chambremetier.demandes;
           console.log(this.dataSource.data);
        } else if (this.appUser.agentgouvernance != null) {
           this.dataSource.data = this.appUser.agentgouvernance.gouvernance.chambremetiers[0].demandes;
           console.log(this.dataSource.data);

        } else {
          this.getDemandes();

        }       
        console.log(this.appUser);
      }, err => {

      }
    );

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
    this.demande.statutdemande = 0;
    this.demandeFormGroup = this.formBuilder.group({
      departementid: ['', Validators.required],
      cni: ['', Validators.required]
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

  test() {
    console.log(this.personnFormGroup.controls.datenaissance.value);
    // tslint:disable-next-line:ban-types
    const dateNaiss: String = this.personnFormGroup.controls.datenaissance.value.toString().split(' ');
    this.demande.datenaissance = dateNaiss[2] + '/' + dateNaiss[1] + '/' + dateNaiss[3];
    console.log(this.demande.datenaissance);
  }

  get dem() {
    console.log('get get get ====>');
    return this.getDemandes();
  }

  getDemandes() {
    
    this.chambreService.getDemande().subscribe(
      datademande => {
        this.dataSource.data = datademande;
        console.log(this.dataSource.data);
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
    // tslint:disable-next-line:ban-types
    const dateNaiss: String = this.personnFormGroup.controls.datenaissance.value.toString().split(' ');
    this.demande.datenaissance = dateNaiss[2] + '/' + dateNaiss[1] + '/' + dateNaiss[3];
    // this.demande.datenaissance = personnData.datenaissance.value;
    this.demande.adresse = personnData.adresse.value;
    this.demande.genre = personnData.genre.value;
    this.demande.email = personnData.email.value;
    this.demande.telephone = personnData.telephone.value;
    // demande data
    this.demande.cni = demandeData.cni.value;
    // Data mapping
    this.departement = this.getDepartement(+demandeData.departementid.value);
    console.log(this.departement);
    this.demande.chambremetier = this.departement.region.gouvernances[0].chambremetiers[0];
    this.demande.iddepartement = this.departement.iddepartement;
    const depart = new Departement();
    depart.iddepartement = this.departement.iddepartement;
    // artisan data
    this.demande.adressprof = artisanData.adressprof.value;
    this.demande.experiencepro = artisanData.experiencepro.value;
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

  onSelectFileOne(event) {
    const file = event.target.files[0];
    this.justificatif = file;
  }

  onSelectFileTwo(event) {
    const file = event.target.files[0];
    this.photo = file;
  }
  postDemande() {
    this.dataGroup();
    const formData = new FormData();
    formData.append('demande', JSON.stringify(this.demande));
    formData.append('justificatif', this.justificatif);
    formData.append('photo', this.photo);

    console.log(formData.get('demande'));
    this.chambreService.postDemande(formData).subscribe(
      rep => {
        console.log(rep);
        this.dataSource.data.push(rep);
        this.dataSource._updateChangeSubscription();
        ;
      }, err => {
        console.log(err);
      }
    );

    // t his.dataSource.data.pop(this.demande);
  }

   

}
