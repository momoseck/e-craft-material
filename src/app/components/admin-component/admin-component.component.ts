import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/models/Region';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { MainTableDataSource } from 'src/app/components/main-table/main-table-datasource';
import { Departement } from 'src/app/models/Departement';
import { Chambremetier } from 'src/app/models/Chambremetier';
import { Compte } from 'src/app/models/Compte';
import { Professions } from 'src/app/models/Professions';
import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Section } from 'src/app/models/Section';
import { Artisan } from 'src/app/models/Artisan';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { concat } from 'rxjs/internal/observable/concat';
import { Personne } from 'src/app/models/Personne';
import { Role } from 'src/app/models/Role';
import { Gouvernance } from 'src/app/models/Gouvernance';
import { Agentchambre } from 'src/app/models/Agentchambre';
import { Agentgouvernance } from 'src/app/models/Agentgouvernance';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-admin-component',
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})

export class AdminComponentComponent implements OnInit {
  appUser: Compte = null;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // region
  dataSourceRegion = new MatTableDataSource<Region>();
  regionColumns = ['id', 'nom', 'options'];
  // fin region
  // Departement
  dataSourceDepartement = new MatTableDataSource<Departement>();
  departementColumns = ['idd', 'nomd', 'nomr', 'optionsd'];
  // chambre
  dataSourceChambre = new MatTableDataSource<Chambremetier>();
  chambreColumns = ['buttonc', 'id', 'nomc', 'nomcc', 'optionsc'];

  // compte
  dataSourceCompte = new MatTableDataSource<Compte>();
  compteColumns = ['button', 'idcompte', 'username', 'datecreation', 'role', 'statut', 'optionscc'];

  // corp de metier
  dataSourceMetier = new MatTableDataSource<Professions>();
  metierColumns = ['idmetier', 'nommetier', 'nomsection', 'optionsm'];
  sections: Section[];
  // form group
  professionFormGroup: FormGroup;
  constructor(private authservice: AuthenticationService,
    private adminManagerService: AdminManagerService, private dialog: MatDialog, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const token = this.authservice.getToken();


    const jwtHelper = new JwtHelperService();
    const decode = jwtHelper.decodeToken(token);
    const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const expired = jwtHelper.isTokenExpired(token);
    this.authservice.load().subscribe(
      response => {
        this.appUser = response;
      }, err => {

      }
    );
    console.log(this.appUser);
    this.professionFormGroup = this.formBuilder.group({
      professionName: ['', Validators.required],
      sectionid: ['', Validators.required]
    });
    this.adminManagerService.getRegions().subscribe(
      data => {
        this.dataSourceRegion.data = data;
        this.dataSourceRegion.paginator = this.paginator.toArray()[3];
      }
    );
    this.adminManagerService.getDepartements().subscribe(
      datas => {
        this.dataSourceDepartement.data = datas;
        this.dataSourceDepartement.paginator = this.paginator.toArray()[2];

      }
    );
    this.adminManagerService.getChambremetier().subscribe(
      datas => {
        this.dataSourceChambre.data = datas;
        this.dataSourceChambre.paginator = this.paginator.toArray()[0];
      }
    );
    this.adminManagerService.getCompte().subscribe(
      datas => {
        this.dataSourceCompte.data = datas;
        this.dataSourceCompte.paginator = this.paginator.toArray()[1];
      }
    );
    this.adminManagerService.getProfessions().subscribe(
      datas => {
        this.dataSourceMetier.data = datas;
        this.dataSourceMetier.paginator = this.paginator.toArray()[4];
      }
    );
    this.adminManagerService.getSection().subscribe(
      response => {
        this.sections = response;
      }
    );
    console.log(this.paginator);
  }
  addSection() {
    const profession = new Professions();
    profession.idprofession = 500;
    profession.professionName = this.professionFormGroup.controls.professionName.value;
    profession.section = new Section();
    profession.section = this.professionFormGroup.controls.sectionid.value;
    this.adminManagerService.postProfession(profession).subscribe(
      response => {
        this.dataSourceMetier.data.push(profession);
        this.dataSourceMetier._updatePaginator(this.dataSourceMetier.data.length);
      }
    );
  }

  saveAgent() {

  }
  onClick() {
    alert('bonjour');
  }

  openDialog() {
    const dialogRef = this.dialog.open(CompteDialogComponent, {
      height: '550px',
      width: '600px',
      data: '',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialog2() {
    const dialogRef = this.dialog.open(ChambreDialogComponent, {
      height: '450px',
      width: '600px',
      data: '',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}


// COMPONENT DIALOG
@Component({
  selector: 'app-compte-dialog',
  templateUrl: 'compte-dialog.html',
  styleUrls: ['./compte-dialog.css']
})
export class CompteDialogComponent implements OnInit {
  appUser: Compte = null;
  isDisabled = true;
  isOptional = false;
  artisan: Artisan;
  roles: Role[] = [];
  compte: Compte = new Compte();
  compteDecideur: Compte = new Compte();
  compteArtisanFormGroup: FormGroup;
  compteDecideurFormGroup: FormGroup;
  displayedColumns: string[] = ['prenom', 'nom', 'adress', 'telephone', 'profession'];
  dataSource = new MatTableDataSource<Artisan>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialogRef: MatDialogRef<CompteDialogComponent>, private authservice: AuthenticationService,
    private chambreService: ChambreManagerService, private adminService: AdminManagerService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.appUser = this.authservice.loadUser();
    this.compteArtisanFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
    this.compteDecideurFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      passwordConf: ['', Validators.required]

    });
    this.chambreService.getArtisan().subscribe(
      response => {
        this.dataSource.data = response;
        for (let i = 0; i < this.dataSource.data.length; i++) {
          this.dataSource.data[i].nom = this.dataSource.data[i].personne.nom;
        }
      }
    );
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
    this.dataSource.paginator = this.paginator;

    this.compte.personne = new Personne();
    let rolesCopy: Role[] = [];
    this.adminService.getRole().subscribe(
      response => {
        rolesCopy = response;
        for (let i = 0; i < rolesCopy.length; i++) {
          if (rolesCopy[i].role == 'DECIDEUR' || rolesCopy[i].role == 'ADMIN') {
            this.roles.push(rolesCopy[i]);

          }
        }
      }
    );
  }
  applyFilter(event) {
    const nom = event.value;
    const tableFilters = [];
    tableFilters.push({
      id: 'nom',
      value: nom
    });
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
      this.compteArtisanFormGroup.controls.username.setValue(this.artisan.personne.email);
      this.compte.personne.numeroutilisateur = this.artisan.numeroutilisateur;
    }

  }

  postCompte() {
    const username = this.compteArtisanFormGroup.controls.username.value;
    const password = this.compteArtisanFormGroup.controls.password.value;
    this.compte.username = username;
    this.compte.password = password;

    let role = null;
    this.adminService.getRol('ARTISANT').subscribe(
      data => {
        role = data;
        this.compte.role = role;

        this.adminService.postCompte(this.compte).subscribe(
          response => {
            console.log('coll');
          }, err => {
            console.log(err);
          }
        );
      }
    );

  }

  postsCompte() {
    if (this.compteDecideurFormGroup.valid) {

      const username = this.compteDecideurFormGroup.controls.username.value;
      const password = this.compteDecideurFormGroup.controls.password.value;
      const passwordConf = this.compteDecideurFormGroup.controls.passwordConf.value;
      const role = this.compteDecideurFormGroup.controls.role.value;
      this.compteDecideur.username = username;
      this.compteDecideur.password = password;
      this.compteDecideur.role = role;
      if (passwordConf !== password) {
        this.compteDecideurFormGroup.controls.passwordConf.setValue('');
        alert('veuillez confrimer votre mot de passe');
      } else {

        this.adminService.postCompte(this.compteDecideur).subscribe(
          response => {
            console.log('colllllll');
          }, err => {
            console.log(err);
          }
        );
      }
    }

  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  generer() {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
      'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numeric = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let password = '';
    const indexAlphabet: number[] = [];
    const ondexNumeric: number[] = [];
    for (let i = 0; i < 5; i++) {
      indexAlphabet.push(this.getRandomInt(25));
    }
    for (let i = 0; i < 3; i++) {
      ondexNumeric.push(this.getRandomInt(10));
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < indexAlphabet.length; i++) {
      if (indexAlphabet[i] % 2 === 0) {
        password += alphabet[indexAlphabet[i]].toUpperCase();
      } else {
        password += alphabet[indexAlphabet[i]];
      }
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ondexNumeric.length; i++) {
      password += numeric[ondexNumeric[i]];
    }
    this.compteArtisanFormGroup.controls.password.setValue(password);
  }
}


// COMPONENT DIALOG
@Component({
  selector: 'app-chambre-dialog',
  templateUrl: 'chambre-dialog.html',
  styleUrls: ['./chambre-dialog.css']
})
export class ChambreDialogComponent implements OnInit {
  appUser: Compte = null;
  chambre: Chambremetier = new Chambremetier();
  gouvernance: Gouvernance = new Gouvernance();
  compteChambre: Compte = new Compte();
  compteGouvernance: Compte = new Compte();
  regions: Region[];
  roleG: Role;
  roleC: Role;
  gouvernanceFormGroup: FormGroup;
  chambreFormGroup: FormGroup;
  isOptional = false;
  constructor(
    public dialogRef: MatDialogRef<CompteDialogComponent>, private authservice: AuthenticationService,
    private chambreService: ChambreManagerService, private adminService: AdminManagerService, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.appUser = this.authservice.loadUser();
    this.adminService.getRol('AGENT_GOUVERNANCE').subscribe(
      data => {
        this.roleG = data;
      }
    );

    this.adminService.getRol('AGENT_CHAMBRE').subscribe(
      data => {
        this.roleC = data;
      }
    );
    this.gouvernanceFormGroup = this.formBuilder.group({
      gouvernance: ['', Validators.required],
      region: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordconf: ['', Validators.required]
    });
    this.chambreFormGroup = this.formBuilder.group({
      chambre: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordconf: ['', Validators.required]
    });
    this.adminService.getRegions().subscribe(
      response => {
        this.regions = response;
      }
    );
  }

  getFormsData() {

  }
  postChambre() {
    const gouveData = this.gouvernanceFormGroup.controls;
    this.gouvernance.idgouvernance = 450;
    this.gouvernance.nomgouvernance = gouveData.gouvernance.value;
    this.gouvernance.region = gouveData.region.value;
    // compte gouvernance
    this.compteGouvernance.idcompte = 404;
    this.compteGouvernance.username = gouveData.username.value;
    this.compteGouvernance.password = gouveData.password.value;
    this.compteGouvernance.role = this.roleG;
    // chambre
    const chambreData = this.chambreFormGroup.controls;
    this.chambre.idchambre = 505;
    this.chambre.nomchambre = chambreData.chambre.value;
    // comte chambre
    this.compteChambre.idcompte = 505;
    this.compteChambre.username = chambreData.username.value;
    this.compteChambre.password = chambreData.password.value;
    this.compteChambre.role = this.roleC;

    const formdata = new FormData();
    formdata.append('gouvernance', JSON.stringify(this.gouvernance));
    formdata.append('chambre', JSON.stringify(this.chambre));
    formdata.append('compteg', JSON.stringify(this.compteGouvernance));
    formdata.append('comptec', JSON.stringify(this.compteChambre));
    this.adminService.postChambre(formdata).subscribe(
      response => {
        alert('chambre ajoutée avec succes');

      }, err => {

      });


  }
}
