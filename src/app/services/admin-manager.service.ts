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

@Injectable({
  providedIn: 'root'
})
export class AdminManagerService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:ban-types
  host: String = 'http://localhost:8080/admin/';
  // Region CRUD
  getRegions(): Observable<Region[]> {
    return this.http.get<Region[]>(this.host + 'listRegions');
  }
  postRegion(region: Region): Observable<Region> {
    return this.http.post<Region>(this.host + 'saveRegion', region);
  }
  updateRegion(region: Region): Observable<Region> {
    return this.http.put<Region>(this.host + 'updateRegion', region);
  }
  deleteRegion(region: Region) {
    return this.http.put<Region>(this.host + 'deleteRegion', region);
  }
  // Departement CRUD
  getDepartements(): Observable<Departement[]> {
    return this.http.get<Departement[]>(this.host + 'listDepartements');
  }
  postDepartement(departement: Departement): Observable<Departement> {
    return this.http.post<Departement>(this.host + 'saveDepartement', departement);
  }
  updateDepartement(departement: Departement): Observable<Departement> {
    return this.http.put<Departement>(this.host + 'updateDepartement', departement);
  }
  deleteDepartement(departement: Departement) {
    return this.http.put<Departement>(this.host + 'deleteDepartement', departement);
  }
  // chambremetier crud
  getChambremetier(): Observable<Chambremetier[]> {
    return this.http.get<Chambremetier[]>(this.host + 'listChambres');
  }
  postChambremetier(chambremetier: Chambremetier): Observable<Chambremetier> {
    return this.http.post<Chambremetier>(this.host + 'saveChambre', chambremetier);
  }
  updateChambremetier(chambremetier: Chambremetier): Observable<Chambremetier> {
    return this.http.put<Chambremetier>(this.host + 'updateChambre', chambremetier);
  }
  deleteChambremetier(chambremetier: Chambremetier) {
    return this.http.put<Chambremetier>(this.host + 'deleteChambre', chambremetier);
  }
  // crud gouvernance
  getGouvernance(): Observable<Gouvernance[]> {
    return this.http.get<Gouvernance[]>(this.host + 'listGouvernances');
  }
  postGouvernance(couvernance: Gouvernance): Observable<Gouvernance> {
    return this.http.post<Gouvernance>(this.host + 'saveGouvernance', couvernance);
  }
  updateGouvernance(couvernance: Gouvernance): Observable<Gouvernance> {
    return this.http.put<Gouvernance>(this.host + 'updateGouvernance', couvernance);
  }
  deleteGouvernance(couvernance: Gouvernance) {
    return this.http.put<Gouvernance>(this.host + 'deleteGouvernance', couvernance);
  }
  // crud section

  getSection(): Observable<Section[]> {
    return this.http.get<Gouvernance[]>(this.host + 'listGouvernances');
  }
  postSection(section: Section): Observable<Section> {
    return this.http.post<Section>(this.host + 'saveGouvernance', section);
  }
  updateSection(section: Section): Observable<Section> {
    return this.http.put<Section>(this.host + 'updateGouvernance', section);
  }
  deleteSection(section: Section) {
    return this.http.put<Section>(this.host + 'deleteGouvernance', section);
  }

  // role
  getRole(): Observable<Role[]> {
    return this.http.get<Role[]>(this.host + 'listRoles');
  }

  // crud compte
  getCompte(): Observable<Compte[]> {
    return this.http.get<Compte[]>(this.host + 'listComptes');
  }
  postCompte(compte: Compte): Observable<Compte> {
    return this.http.post<Compte>(this.host + 'saveCompte', compte);
  }
  updateCompte(compte: Compte): Observable<Compte> {
    return this.http.put<Compte>(this.host + 'updateCompte', compte);
  }
  deleteCompte(compte: Compte) {
    return this.http.put<Compte>(this.host + 'deleteCompte', compte);
  }
  // profession
  getProfession(): Observable<Professions[]> {
    return this.http.get<Professions[]>(this.host + 'listProfessions');
  }

  // crud agent chambre des metier

  getAgentChambre(): Observable<Agentchambre[]> {
    return this.http.get<Agentchambre[]>(this.host + 'listAgentCh');
  }
  postAgentChambre(agentchambre: Agentchambre): Observable<Agentchambre> {
    return this.http.post<Agentchambre>(this.host + 'saveAgentCh', agentchambre);
  }
  updateAgentChambre(agentchambre: Agentchambre): Observable<Agentchambre> {
    return this.http.put<Agentchambre>(this.host + 'updateAgentCh', agentchambre);
  }
  deleteAgentChambre(agentchambre: Agentchambre) {
    return this.http.put<Agentchambre>(this.host + 'deleteAgentCh', agentchambre);
  }

  // crud agent gouvernance

  getAgentGouvernance(): Observable<Agentgouvernance[]> {
    return this.http.get<Agentgouvernance[]>(this.host + 'listAgentGouv');
  }
  postAgentGouvernance(agentgouvernance: Agentgouvernance): Observable<Agentgouvernance> {
    return this.http.post<Agentgouvernance>(this.host + 'saveAgentGouv', agentgouvernance);
  }
  updateAgentGouvernance(agentgouvernance: Agentgouvernance): Observable<Agentgouvernance> {
    return this.http.put<Agentgouvernance>(this.host + 'updateAgentGouv', agentgouvernance);
  }
  deleteAgentGouvernance(agentgouvernance: Agentgouvernance) {
    return this.http.put<Agentgouvernance>(this.host + 'deleteAgentGouv', agentgouvernance);
  }
}
