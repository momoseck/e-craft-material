import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paiement } from 'src/app/models/Paiement';
import { Observable } from 'rxjs';
import { Entrepriseartisanale } from 'src/app/models/Entrepriseartisanale';
import { Gie } from 'src/app/models/Gie';
import { Demande } from 'src/app/models/Demande';

@Injectable({
  providedIn: 'root'
})
export class ChambreManagerService {
  // tslint:disable-next-line:ban-types
  host: String = 'http://localhost:8080/agent/';
  constructor(private http: HttpClient) { }
  // Crud paiement
  getRegions(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.host + 'listPaiements');
  }
  postRegion(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.host + 'savePaiement', Paiement);
  }
  updateRegion(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(this.host + 'updatePaiement', Paiement);
  }
  deleteRegion(paiement: Paiement) {
    return this.http.put<Paiement>(this.host + 'deletePaiement', Paiement);
  }
  // Crud Entrepriseartisanale
  getEntrepriseartisanale(): Observable<Entrepriseartisanale[]> {
    return this.http.get<Entrepriseartisanale[]>(this.host + 'listEntreprise');
  }
  postEntrepriseartisanale(entrepriseartisanale: Entrepriseartisanale): Observable<Entrepriseartisanale> {
    return this.http.post<Entrepriseartisanale>(this.host + 'saveEntreprise', entrepriseartisanale);
  }
  updateEntrepriseartisanale(entrepriseartisanale: Entrepriseartisanale): Observable<Entrepriseartisanale> {
    return this.http.put<Entrepriseartisanale>(this.host + 'updateEntreprise', entrepriseartisanale);
  }
  deleteEntrepriseartisanale(entrepriseartisanale: Entrepriseartisanale) {
    return this.http.put<Entrepriseartisanale>(this.host + 'deleteEntreprise', entrepriseartisanale);
  }

  // Crud Gie
  getGie(): Observable<Gie[]> {
    return this.http.get<Gie[]>(this.host + 'listGies');
  }
  postGie(gie: Gie): Observable<Gie> {
    return this.http.post<Gie>(this.host + 'saveGie', gie);
  }
  updateGie(gie: Gie): Observable<Gie> {
    return this.http.put<Gie>(this.host + 'updateGie', gie);
  }
  deleteGie(gie: Gie) {
    return this.http.put<Gie>(this.host + 'deleteGie', gie);
  }

  // Crud Gie
  getDemande(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host + 'listGies');
  }
  postDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.host + 'saveGie', demande);
  }
  updateDemande(demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(this.host + 'updateGie', demande);
  }
  deleteDemande(demande: Demande) {
    return this.http.put<Demande>(this.host + 'deleteGie', demande);
  }
}