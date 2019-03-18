import { Compte } from 'src/app/models/Compte';

export class Role {
   public idrole: number;
   public role: string;
   public comptes?: Compte[];
}
