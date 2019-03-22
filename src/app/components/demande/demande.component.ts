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
  personne: Personne = new Personne();
  artisan: Artisan = new Artisan();

  departement: Departement;
  repertoire: Repertoire = new Repertoire();
  professions: Professions[];
  departements: Departement[];
  isOptional = false;
  displayedColumns: string[] = ['idDemande', 'prenom', 'nom', 'adress', 'genre', 'CNI', 'statut'];
  dataSource = new MatTableDataSource<Demande>();
  personnes: Personne[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chambreService: ChambreManagerService, private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private adminservice: AdminManagerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.chambreService.getDemande().subscribe(
      datademande => {
        console.log(datademande);
        this.dataSource.data = datademande;
      }
    );
    this.artisan.professions = new Professions();
    // formGroup personn
    this.personne.numeroutilisateur = '123';
    this.personnFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      datenaissance: ['', Validators.required],
      adress: ['', Validators.required],
      genre: ['', Validators.required]
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
    this.artisan.statut = false;
    this.artisan.dateinscrit = '03-12-1998';
    this.artisanFormGroup = this.formBuilder.group({
      professionid: ['', Validators.required],
      adressprof: ['', Validators.required],
      experiencepro: ['', Validators.required]
    });

    this.adminservice.getProfessions().subscribe(
      listProfession => {
        this.professions = listProfession;
        console.log('2222222222' + this.professions);
      }
    );

    this.adminservice.getDepartements().subscribe(
      listDepartements => {
        this.departements = listDepartements;
        console.log(' 3333333' + this.departements);
      }
    );

  }

  dataGroup() {
    console.log('get->>>>');
    const personnData = this.personnFormGroup.controls;
    const demandeData = this.demandeFormGroup.controls;
    const artisanData = this.artisanFormGroup.controls;
    // persone data
    this.personne.nom = personnData.nom.value;
    this.personne.prenom = personnData.prenom.value;
    this.personne.datenaissance = personnData.datenaissance.value;
    this.personne.adress = personnData.adress.value;
    this.personne.genre = personnData.genre.value;
    // demande data
    this.demande.justificatif = demandeData.justificatif.value;
    this.demande.cni = demandeData.cni.value;
    this.demande.photo = demandeData.photo.value;
    // Data mapping
    this.artisan.professions = new Professions();
    //
    //
    this.artisan.personne = this.personne;
    this.artisan.professions.idprofession = +artisanData.professionid.value;
    this.artisan.repertoire = this.repertoire;
    this.repertoire.departement = this.departement;
    this.departement = this.getDepartement(+demandeData.departementid.value);
    this.demande.chambremetier = this.departement.region.gouvernances[0].chambremetiers[0];
    // artisan data
    this.artisan.adressprof = artisanData.adressprof.value;
    this.artisan.experiencepro = artisanData.experiencepro.value;
  }
  getPersonn(id: string) {

    return null;
  }
  // listProfession() {
  //   this.adminservice.getProfessions().subscribe(
  //     listProfession => {
  //       this.professions = listProfession;
  //     }
  //   );
  // }
  // listDepartements() {
  //   this.adminservice.getDepartements().subscribe(
  //     listDepartements => {
  //       this.departements = listDepartements;
  //     }
  //   );
  // }
  getDepartement(id: number): Departement {
    if (this.departements != null) {
      const deparray = this.departements;
      for (const dep of deparray) {
        if (dep.iddepartement === id) {
          console.log('thisss :' + dep.iddepartement);
          console.log('thisss :' + dep.nomdepartement);
          return dep;
        }
      }
    }
    return null;
  }
  postDemande() {
    this.dataGroup();
    console.log(this.demande.chambremetier.nomchambre);
    // this.artisan.professions.idprofession = +this.artisanFormGroup.controls.professionid.value;
    // this.personne.nom = this.personnFormGroup.controls.nom.value;
    /*this.chambreService.postRepertoire(this.repertoire).subscribe(
      rep => {
        console.log(rep);
      }, err => {
        console.log(err);
      }
    );*/
    this.chambreService.postPersonne(this.personne).subscribe(
      rep => {
        console.log(rep);
      }, err => {
        console.log(err);
      }
    );
    /*this.chambreService.postArtisan(this.artisan).subscribe(
      rep => {
        console.log(rep);
      }, err => {
        console.log(err);
      }
    );
    this.chambreService.postDemande(this.demande).subscribe(
      rep => {
        console.log(rep);
      }, err => {
        console.log(err);
      }
    );*/
    //this.dataSource.data.pop(this.demande);
  }

}
