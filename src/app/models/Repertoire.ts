import { Departement } from 'src/app/models/Departement';
import { Artisan } from 'src/app/models/Artisan';

export class Repertoire {
   public idrepertoire: number;
   public departement: Departement;
   public nomrepertoire: string;
   public artisans?: Artisan[];
}
