import { Gouvernance } from 'src/app/models/Gouvernance';
import { Paiement } from 'src/app/models/Paiement';
import { Demande } from 'src/app/models/Demande';
import { Agentchambre } from 'src/app/models/Agentchambre';

export class Chambremetier {
   public idchambre: number;
   public gouvernance: Gouvernance;
   public nomchambre: string;
   public localisation: string;
   public demandes?: Demande;
   public agentChambre?: Agentchambre;
}
