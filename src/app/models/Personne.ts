import { Compte } from 'src/app/models/Compte';
import { Demande } from 'src/app/models/Demande';

export class Personne {
    public numeroutilisateur: string;
    public nom: string;
    public prenom: string;
    public datenaissance: string;
    public adresse: string;
    public genre: string;
    public email: string;
    public telephone: string;
    public comptes?: Compte[];
}
