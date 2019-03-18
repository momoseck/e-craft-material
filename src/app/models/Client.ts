import { Personne } from 'src/app/models/Personne';
import { Commande } from 'src/app/models/Commande';

export class Client {
   public numeroutilisateur: number;
   public personne: Personne;
   public commandes?: Commande;
}
