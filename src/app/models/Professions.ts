import { Section } from 'src/app/models/Section';
import { Artisan } from 'src/app/models/Artisan';

export class Professions {
   public  idprofession: number;
   public section: Section;
   public professionsName: string;
   public artisan?: Artisan[];
}
