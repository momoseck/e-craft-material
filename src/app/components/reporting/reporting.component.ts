import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Artisan } from 'src/app/models/Artisan';
import { ChambreManagerService } from 'src/app/services/chambre-manager.service';
import { ArtisanReporte } from 'src/app/models/ArtisanReport';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Region } from 'src/app/models/Region';
import { Section } from 'src/app/models/Section';
import { Departement } from 'src/app/models/Departement';
import { Professions } from 'src/app/models/Professions';
import { Compte } from 'src/app/models/Compte';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  appUser: Compte = null;
  displayedColumns: string[] = ['numero', 'nom', 'prenom', 'adresse', 'genre', 'profession', 'region', 'departement', 'section'];
  dataSource = new MatTableDataSource<ArtisanReporte>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  regions: string[] = [];
  departements: string[] = [];
  departementsCopy: string[] = [];
  sections: string[] = [];
  professions: string[] = [];
  professionsCopy: string[] = [];
  filterFormGroup: FormGroup;
  //
  selectRegion: Region[] = [];
  selectSection: Section[] = [];
  selectDepartement: Departement[] = [];
  selectProfession: Professions[] = [];
  constructor(private authservice: AuthenticationService,
    private chambreService: ChambreManagerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.appUser = this.authservice.loadUser();
    this.dataSource.paginator = this.paginator;
    this.filterFormGroup = this.formBuilder.group({
      region: '',
      section: '',
      profession: '',
      genre: '',
      departement: ''
    });
    /* le bon
    this.dataSource.filterPredicate =
      (data: Artisan, filter: string) => data.personne.nom.indexOf(filter) !== -1;
      */
    this.chambreService.getArtisans().subscribe(
      dataArtisan => {
        this.dataSource.data = dataArtisan;
        for (let i = 0; i < this.dataSource.data.length; i++) {
          this.dataSource.data[i].profession = this.dataSource.data[i].professions.professionName;
          this.dataSource.data[i].region = this.dataSource.data[i].repertoire.departement.region.nomregion;
          this.dataSource.data[i].departement = this.dataSource.data[i].repertoire.departement.nomdepartement;
          this.dataSource.data[i].genre = this.dataSource.data[i].personne.genre;
          this.dataSource.data[i].section = this.dataSource.data[i].professions.section.nomsection;

          if (!this.regions.includes(this.dataSource.data[i].region)) {
            this.regions.push(this.dataSource.data[i].region);
            this.selectRegion.push(this.dataSource.data[i].repertoire.departement.region);
          }
          if (!this.departements.includes(this.dataSource.data[i].departement)) {
            this.departements.push(this.dataSource.data[i].departement);
            this.selectDepartement.push(this.dataSource.data[i].repertoire.departement);
          }
          if (!this.sections.includes(this.dataSource.data[i].section)) {
            this.sections.push(this.dataSource.data[i].section);
            this.selectSection.push(this.dataSource.data[i].professions.section);
          }
          if (!this.professions.includes(this.dataSource.data[i].profession)) {
            this.professions.push(this.dataSource.data[i].profession);
            this.selectProfession.push(this.dataSource.data[i].professions);
          }
        }
        // chargement region departements
        for (let j = 0; j < this.selectRegion.length; j++) {
          const dep: Departement[] = [];
          for (let i = 0; i < this.selectDepartement.length; i++) {
            if (this.selectDepartement[i].region.idregiont === this.selectRegion[j].idregiont) {
              dep.push(this.selectDepartement[i]);
            }
          }
          this.selectRegion[j].departements = dep;
        }
// chargement section coprs de metier
        for (let j = 0; j < this.selectSection.length; j++) {
          const prof: Professions[] = [];
          for (let i = 0; i < this.selectProfession.length; i++) {
            if (this.selectProfession[i].section.idsection === this.selectSection[j].idsection) {
              prof.push(this.selectProfession[i]);
            }
          }
          this.selectSection[j].professionses = prof;
        }

        this.departementsCopy = this.departements;
        this.professionsCopy = this.professions;
        console.log(this.dataSource.data);
        console.log(this.sections);
        console.log(this.selectSection);
      }
    );
    this.dataSource.filterPredicate =
      (data: ArtisanReporte, filtersJson: string) => {
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

  }


  /*
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }*/

  /*applyFilterRegion(filterValue: string) {
    if (filterValue !== '') {
      const tableFilters = [];
      tableFilters.push({
        id: 'region',
        value: filterValue
      });
      this.dataSource.filter = JSON.stringify(tableFilters);

    }
  }*/
  applyFilter() {
    this.departements = this.departementsCopy;
    this.professions = this.professionsCopy;
    const filterControl = this.filterFormGroup.controls;
    const tableFilters = [];
    console.log('testttttt=' + filterControl.region.value);
    if (filterControl.region.value !== undefined) {
      tableFilters.push({
        id: 'region',
        value: filterControl.region.value
      });
      for (let i = 0; i < this.selectRegion.length; i++) {
        if (this.selectRegion[i].nomregion === filterControl.region.value) {
          this.departements = [];
          for (let j = 0; j < this.selectRegion[i].departements.length; j++) {
            this.departements.push(this.selectRegion[i].departements[j].nomdepartement);
          }
        }
      }
    }
    if (filterControl.departement.value !== undefined) {
      tableFilters.push({
        id: 'departement',
        value: filterControl.departement.value
      });
    }
    if (filterControl.section.value !== undefined) {
      tableFilters.push({
        id: 'section',
        value: filterControl.section.value
      });
      for (let i = 0; i < this.selectSection.length; i++) {
        if (this.selectSection[i].nomsection === filterControl.section.value) {
          this.professions = [];
          for (let j = 0; j < this.selectSection[i].professionses.length; j++) {
            this.professions.push(this.selectSection[i].professionses[j].professionName);
          }
        }
      }
    }
    if (filterControl.genre.value !== undefined) {
      tableFilters.push({
        id: 'genre',
        value: filterControl.genre.value
      });
    }
    if (filterControl.profession.value !== undefined) {
      tableFilters.push({
        id: 'profession',
        value: filterControl.profession.value
      });
    }

    this.dataSource.filter = JSON.stringify(tableFilters);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
