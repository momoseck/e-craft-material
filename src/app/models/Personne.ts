import { Compte } from 'src/app/models/Compte';
import { Demande } from 'src/app/models/Demande';

export class Personne {
   public  numeroutilisateur: string;
   public pom: string;
   public prenom: string;
   public datenaissance: string;
   public adress: string;
   public genre; string;
   public comptes?: Compte[];
   public demandes?: Demande[];
}
