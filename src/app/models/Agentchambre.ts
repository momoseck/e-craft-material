import { Chambremetier } from 'src/app/models/Chambremetier';
import { Compte } from 'src/app/models/Compte';
export class Agentchambre {
    public idAgentChambre: string;
    public chambremetier: Chambremetier;
    public comptes?: Compte[];
}
