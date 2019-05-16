import { Personne } from 'src/app/models/Personne';
import { Role } from 'src/app/models/Role';
import { Agentchambre } from 'src/app/models/Agentchambre';
import { Agentgouvernance } from 'src/app/models/Agentgouvernance';

export class Compte {
    public idcompte: number;
    public personne?: Personne;
    public role: Role;
    public username: string;
    public password: string;
    public datecration: string;
    public actif: boolean;
    public nomStructure: string;
    public agentchambre?: Agentchambre;
    public agentgouvernance?: Agentgouvernance;
}
