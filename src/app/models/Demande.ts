import { Chambremetier } from 'src/app/models/Chambremetier';
import { Personne } from 'src/app/models/Personne';

export class Demande {
    public iddemande: number;
    public chambremetier: Chambremetier;
    public personne: Personne;
    public statudemande: number;
    public justificatif: string;
    public cni: string;
    public photo: string;
}
