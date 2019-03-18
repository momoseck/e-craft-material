import { Gouvernance } from 'src/app/models/Gouvernance';
import { Compte } from 'src/app/models/Compte';

export class Agentgouvernance {
    public idAgentGouvernance: string;
    public gouvernance: Gouvernance;
    public comptes?: Compte[];
}
