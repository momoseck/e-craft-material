import { Departement } from 'src/app/models/Departement';
import { Gouvernance } from 'src/app/models/Gouvernance';

export class Region {
   public idregiont: number;
    public nomregion: string;
    public gouvernances: Gouvernance[];
    public departement?: Departement[];
}
