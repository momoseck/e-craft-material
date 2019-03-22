import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/models/Region';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from 'src/app/models/Departement';
import { Chambremetier } from 'src/app/models/Chambremetier';
import { Gouvernance } from 'src/app/models/Gouvernance';
import { Section } from 'src/app/models/Section';
import { Role } from 'src/app/models/Role';
import { Compte } from 'src/app/models/Compte';
import { Professions } from 'src/app/models/Professions';
import { Agentchambre } from 'src/app/models/Agentchambre';
import { Agentgouvernance } from 'src/app/models/Agentgouvernance';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {
  // header = new HttpHeaders({ 'Content-Type': 'application/json' });
  // tslint:disable-next-line:ban-types
  host: String = 'http://localhost:8080/admin/';
  header: any;
  constructor(private http: HttpClient, private authenticationservice: AuthenticationService) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.header = new HttpHeaders({ 'authorization': this.authenticationservice.getToken() });
  }
  // Region CRUD
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.host + 'listRegions', { headers: this.header });
  }
  postRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.host + 'saveRegion', region, { headers: this.header });
  }
  updateRegion(region: Region): Observable<Region> {
    return this.http.put<Region>(this.host + 'updateRegion', region , { headers: this.header });
  }
  deleteRegion(region: Region) {
    return this.http.put<Region>(this.host + 'deleteRegion', region , { headers: this.header });
  }
  // Departement CRUD
  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.host + 'listDepartements', { headers: this.header });
  }
  postDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.host + 'saveDepartement', departement , { headers: this.header });
  }
  updateDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(this.host + 'updateDepartement', departement , { headers: this.header });
  }
  deleteDepartement(departement: Departement) {
    return this.http.put<Departement>(this.host + 'deleteDepartement', departement , { headers: this.header });
  }
  // chambremetier crud
  getChambremetier(): Observable<Chambremetier[]> {
    return this.http.get<Chambremetier[]>(this.host + 'listChambres' , { headers: this.header });
  }
  postChambremetier(chambremetier: Chambremetier): Observable<Chambremetier> {
    return this.http.post<Chambremetier>(this.host + 'saveChambre', chambremetier , { headers: this.header });
  }
  updateChambremetier(chambremetier: Chambremetier): Observable<Chambremetier> {
    return this.http.put<Chambremetier>(this.host + 'updateChambre', chambremetier , { headers: this.header });
  }
  deleteChambremetier(chambremetier: Chambremetier) {
    return this.http.put<Chambremetier>(this.host + 'deleteChambre', chambremetier , { headers: this.header });
  }
  // crud gouvernance
  getGouvernance(): Observable<Gouvernance[]> {
    return this.http.get<Gouvernance[]>(this.host + 'listGouvernances' , { headers: this.header });
  }
  postGouvernance(couvernance: Gouvernance): Observable<Gouvernance> {
    return this.http.post<Gouvernance>(this.host + 'saveGouvernance', couvernance , { headers: this.header });
  }
  updateGouvernance(couvernance: Gouvernance): Observable<Gouvernance> {
    return this.http.put<Gouvernance>(this.host + 'updateGouvernance', couvernance , { headers: this.header });
  }
  deleteGouvernance(couvernance: Gouvernance) {
    return this.http.put<Gouvernance>(this.host + 'deleteGouvernance', couvernance , { headers: this.header });
  }
  // crud section

  getSection(): Observable<Section[]> {
    return this.http.get<Section[]>(this.host + 'listSections' , { headers: this.header });
  }
  postSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.host + 'saveSection', section , { headers: this.header });
  }
  updateSection(section: Section): Observable<Section> {
    return this.http.put<Section>(this.host + 'updateSection', section , { headers: this.header });
  }
  deleteSection(section: Section) {
    return this.http.put<Section>(this.host + 'deleteSection', section , { headers: this.header });
  }

  // role
  getRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.host + 'listRoles' , { headers: this.header });
  }
  // crud compte
  getCompte(): Observable<Compte[]> {
    return this.http.get<Compte[]>(this.host + 'listComptes' , { headers: this.header });
  }
  postCompte(compte: Compte): Observable<Compte> {
    return this.http.post<Compte>(this.host + 'saveCompte', compte , { headers: this.header });
  }
  updateCompte(compte: Compte): Observable<Compte> {
    return this.http.put<Compte>(this.host + 'updateCompte', compte , { headers: this.header });
  }
  deleteCompte(compte: Compte) {
    return this.http.put<Compte>(this.host + 'deleteCompte', compte , { headers: this.header });
  }
  // profession
  getProfessions(): Observable<Professions[]> {
    return this.http.get<Professions[]>(this.host + 'listProfessions' , { headers: this.header });
  }
  getProfession(id: number): Observable<Professions> {
    return this.http.get<Professions>(this.host + 'listProfessions/' + id , { headers: this.header });
  }

  // crud agent chambre des metier

  getAgentChambre(): Observable<Agentchambre[]> {
    return this.http.get<Agentchambre[]>(this.host + 'listAgentCh' , { headers: this.header });
  }
  postAgentChambre(agentchambre: Agentchambre): Observable<Agentchambre> {
    return this.http.post<Agentchambre>(this.host + 'saveAgentCh', agentchambre , { headers: this.header });
  }
  updateAgentChambre(agentchambre: Agentchambre): Observable<Agentchambre> {
    return this.http.put<Agentchambre>(this.host + 'updateAgentCh', agentchambre , { headers: this.header });
  }
  deleteAgentChambre(agentchambre: Agentchambre) {
    return this.http.put<Agentchambre>(this.host + 'deleteAgentCh', agentchambre , { headers: this.header });
  }

  // crud agent gouvernance

  getAgentGouvernance(): Observable<Agentgouvernance[]> {
    return this.http.get<Agentgouvernance[]>(this.host + 'listAgentGouv' , { headers: this.header });
  }
  postAgentGouvernance(agentgouvernance: Agentgouvernance): Observable<Agentgouvernance> {
    return this.http.post<Agentgouvernance>(this.host + 'saveAgentGouv', agentgouvernance , { headers: this.header });
  }
  updateAgentGouvernance(agentgouvernance: Agentgouvernance): Observable<Agentgouvernance> {
    return this.http.put<Agentgouvernance>(this.host + 'updateAgentGouv', agentgouvernance , { headers: this.header });
  }
  deleteAgentGouvernance(agentgouvernance: Agentgouvernance) {
    return this.http.put<Agentgouvernance>(this.host + 'deleteAgentGouv', agentgouvernance , { headers: this.header });
  }
}
