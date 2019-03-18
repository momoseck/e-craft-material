import { Client } from 'src/app/models/Client';
import { Article } from 'src/app/models/Article';

export class Commande {
   public idcommande: number;
   public client: Client;
   public datecommande: string;
   public montantcommande: number;
   public quantitecommande: number;
   public articles?: Article[];
}
