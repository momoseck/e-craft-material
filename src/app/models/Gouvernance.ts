import { Region } from 'src/app/models/Region';
import { Chambremetier } from 'src/app/models/Chambremetier';

export class Gouvernance {
   public idgouvernance: number;
   public region: Region;
   public nomgouvernance: string;
   public chambremetier?: Chambremetier[];
}
