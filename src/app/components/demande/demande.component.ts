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
  professions: Professions[];
  isOptional = false;
  displayedColumns: string[] = ['idDemande', 'prenom', 'nom', 'adress', 'genre', 'CNI', 'statut'];
  dataSource = new MatTableDataSource<Demande>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private chambreService: ChambreManagerService, private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private adminservice: AdminManagerService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.listProfession();
    // formGroup personn
    this.personne.numeroutilisateur = '';
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
    //
    this.chambreService.getDemande().subscribe(
      datademande => {
        this.dataSource.data = datademande;
        console.log(this.dataSource.data);
      }
    );
  }

  get dataGroup(): any[] {
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
    // artisan data
    this.artisan.professions = new Professions();
    this.artisan.professions.idprofession = +artisanData.professionid.value;
    this.artisan.adressprof = artisanData.adressprof.value;
    this.artisan.experiencepro = artisanData.experiencepro.value;
    return [this.personnFormGroup.controls, this.demandeFormGroup.controls, this.artisanFormGroup.controls];
  }
  getPersonn(id: string) {

    return null;
  }
  listProfession() {
    this.adminservice.getProfessions().subscribe(
      listProfession => {
        this.professions = listProfession;
      }
    );
  }
  postDemande() {
    this.chambreService.postDemande(this.demande);
    this.chambreService.postArtisan(this.artisan);
  }

}
