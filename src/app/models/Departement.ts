import { Region } from 'src/app/models/Region';
import { Repertoire } from 'src/app/models/Repertoire';

export class Departement {
  public iddepartement: number;
  public region: Region;
  public nomdepartement: string;
  public repertoires?: Repertoire[];
}
