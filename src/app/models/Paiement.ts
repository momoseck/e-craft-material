import { Artisan } from 'src/app/models/Artisan';
import { Chambremetier } from 'src/app/models/Chambremetier';
import { Facture } from 'src/app/models/Facture';

export class Paiement {
   public idpaiement: number;
   public artisan: Artisan;
   public chambremetier: Chambremetier;
   public montant; number;
   public datepaiement: string;
   public factures?: Facture[];
}
