import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paiement } from 'src/app/models/Paiement';
import { Observable } from 'rxjs';
import { Entrepriseartisanale } from 'src/app/models/Entrepriseartisanale';
import { Gie } from 'src/app/models/Gie';
import { Demande } from 'src/app/models/Demande';
import { Artisan } from 'src/app/models/Artisan';
import { Personne } from 'src/app/models/Personne';
import { Repertoire } from 'src/app/models/Repertoire';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { Promise } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ChambreManagerService {
  // tslint:disable-next-line:ban-types
  host: String = 'http://localhost:8080/agent/';
  header: any;
  constructor(private http: HttpClient, private authenticationservice: AuthenticationService) {
    // tslint:disable-next-line:object-literal-key-quotes
    this.header = new HttpHeaders({ 'authorization': this.authenticationservice.getToken(),
     'Content-Type': 'application/json' });
  }
  // Crud paiement
  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.host + 'listPaiements', { headers: this.header });
  }
  postPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.host + 'savePaiement', paiement, { headers: this.header });
  }
  updatePaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(this.host + 'updatePaiement', paiement, { headers: this.header });
  }
  deletePaiement(paiement: Paiement) {
    return this.http.put<Paiement>(this.host + 'deletePaiement', paiement, { headers: this.header });
  }
  // Crud Entrepriseartisanale
  getEntrepriseartisanale(): Observable<Entrepriseartisanale[]> {
    return this.http.get<Entrepriseartisanale[]>(this.host + 'listEntreprise', { headers: this.header });
  }
  postEntrepriseartisanale(entrepriseartisanale: Entrepriseartisanale): Observable<Entrepriseartisanale> {
    return this.http.post<Entrepriseartisanale>(this.host + 'saveEntreprise', entrepriseartisanale, { headers: this.header });
  }
  updateEntrepriseartisanale(entrepriseartisanale: Entrepriseartisanale): Observable<Entrepriseartisanale> {
    return this.http.put<Entrepriseartisanale>(this.host + 'updateEntreprise', entrepriseartisanale, { headers: this.header });
  }
  deleteEntrepriseartisanale(entrepriseartisanale: Entrepriseartisanale) {
    return this.http.put<Entrepriseartisanale>(this.host + 'deleteEntreprise', entrepriseartisanale, { headers: this.header });
  }

  // Crud Gie
  getGie(): Observable<Gie[]> {
    return this.http.get<Gie[]>(this.host + 'listGies', { headers: this.header });
  }
  postGie(gie: Gie): Observable<Gie> {
    return this.http.post<Gie>(this.host + 'saveGie', gie, { headers: this.header });
  }
  updateGie(gie: Gie): Observable<Gie> {
    return this.http.put<Gie>(this.host + 'updateGie', gie, { headers: this.header });
  }
  deleteGie(gie: Gie) {
    return this.http.put<Gie>(this.host + 'deleteGie', gie, { headers: this.header });
  }

  // Crud Demande
  getDemandeP() {
    return this.http.get(this.host + 'listDemandes', { headers: this.header });
  }

  getDemande(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host + 'listDemandes', { headers: this.header });
  }
  getDemandeCh(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host + 'listDemandeCh', { headers: this.header });
  }
  getDemandeGov(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host + 'listDemandeGov', { headers: this.header });
  }
  postDemande(demande: Demande): Observable<Demande> {
    return this.http.post<Demande>(this.host + 'saveDemande', demande, { headers: this.header });
  }
  updateDemande(demande: Demande): Observable<Demande> {
    return this.http.put<Demande>(this.host + 'updateDemande', demande, { headers: this.header });
  }
  deleteDemande(demande: Demande) {
    return this.http.put<Demande>(this.host + 'deleteDemande', demande, { headers: this.header });
  }

  // Crud Artisan
  getArtisan(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.host + 'listArtisans', { headers: this.header });
  }
  postArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http.post<Artisan>(this.host + 'saveArtisan', artisan, { headers: this.header });
  }
  updateArtisan(artisan: Artisan): Observable<Artisan> {
    return this.http.put<Artisan>(this.host + 'updateArtisan', artisan, { headers: this.header });
  }
  deleteArtisan(artisan: Artisan) {
    return this.http.put<Artisan>(this.host + 'deleteArtisan', artisan, { headers: this.header });
  }

  // Crud Personne
  getPersonnes(): Observable<Personne[]> {
    return this.http.get<Personne[]>(this.host + 'listPersonnes', { headers: this.header });
  }
  postPersonne(personne: Personne): Observable<Personne> {
    return this.http.post<Personne>(this.host + 'savePersonne', personne, { headers: this.header });
  }
  updatePersonne(personne: Personne): Observable<Personne> {
    return this.http.put<Personne>(this.host + 'updatePersonne', personne, { headers: this.header });
  }
  deletePersonne(personne: Personne) {
    return this.http.put<Personne>(this.host + 'deletePersonne', personne, { headers: this.header });
  }
  // Crud Repertoire
  getRepertoires(): Observable<Repertoire[]> {
    return this.http.get<Repertoire[]>(this.host + 'listRepertoires', { headers: this.header });
  }
  postRepertoire(repertoire: Repertoire): Observable<Repertoire> {
    return this.http.post<Repertoire>(this.host + 'saveRepertoire', repertoire, { headers: this.header });
  }
  updateRepertoire(repertoire: Repertoire): Observable<Repertoire> {
    return this.http.put<Repertoire>(this.host + 'updateRepertoire', repertoire, { headers: this.header });
  }
  deleteRepertoire(repertoire: Repertoire) {
    return this.http.put<Repertoire>(this.host + 'deleteRepertoire', repertoire, { headers: this.header });
  }
}
