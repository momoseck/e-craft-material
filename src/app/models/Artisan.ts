import { Gie } from 'src/app/models/Gie';
import { Personne } from 'src/app/models/Personne';
import { Professions } from 'src/app/models/Professions';
import { Repertoire } from 'src/app/models/Repertoire';
import { Article } from 'src/app/models/Article';
import { Compagnon } from 'src/app/models/Compagnon';
import { Entrepriseartisanale } from 'src/app/models/Entrepriseartisanale';
import { Paiement } from 'src/app/models/Paiement';
import { Publication } from 'src/app/models/Publication';

export class Artisan {
    public numeroutilisateur: string;
    public gie?: Gie;
    public personne: Personne;
    public nom?: string;
    public prenom?: string;
    public profession?: string;
    public professions: Professions;
    public repertoire: Repertoire;
    public adressprof: string;
    public experiencepro: string;
    public dateinscrit: string;
    public statut: boolean;
    public selected?: boolean;
    public hovered?: boolean;
    public artilces?: Article[];
    public compagnones?: Compagnon[];
    public entrepriseartisanales?: Entrepriseartisanale[];
    public paiement?: Paiement[];
    public publications?: Publication[];
}
