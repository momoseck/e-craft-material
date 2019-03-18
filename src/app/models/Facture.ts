import { Artisan } from 'src/app/models/Artisan';
import { Paiement } from 'src/app/models/Paiement';

export class Facture {
   public idfacture: number;
   public artisan: Artisan;
   public paiement: Paiement;
   public datefacture: string;
}
