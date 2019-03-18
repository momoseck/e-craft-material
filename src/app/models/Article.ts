import { Artisan } from 'src/app/models/Artisan';
import { Publication } from 'src/app/models/Publication';
import { Typearticle } from 'src/app/models/Typearticle';
import { Commande } from 'src/app/models/Commande';

export class Article {
    public idarticle: number;
    public artisan: Artisan;
    public publication: Publication;
    public typearticle: Typearticle;
    public titre: string;
    public description: string;
    public prix: number;
    public commandes?: Commande[];
}
