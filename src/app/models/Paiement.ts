import { Artisan } from 'src/app/models/Artisan';
import { Chambremetier } from 'src/app/models/Chambremetier';

export class Paiement {
   public idpaiement: number;
   public artisan: Artisan;
   public montant: number;
   public datepaiement: string;
}
