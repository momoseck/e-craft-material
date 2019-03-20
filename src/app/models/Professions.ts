import { Section } from 'src/app/models/Section';
import { Artisan } from 'src/app/models/Artisan';

export class Professions {
   public  idprofession: number;
   public section: Section;
   public professionName: string;
   public artisan?: Artisan[];
}
