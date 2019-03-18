import { Artisan } from 'src/app/models/Artisan';
import { Article } from 'src/app/models/Article';

export class Publication {
    public idpublication: number;
    public artisan: Artisan;
    public datepublication: string;
    public etat: number;
    public articles?: Article[];
}
