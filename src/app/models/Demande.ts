import { Chambremetier } from 'src/app/models/Chambremetier';
import { Personne } from 'src/app/models/Personne';

export class Demande {
    public iddemande: number;
    public chambremetier: Chambremetier;
    public nom: string;
    public prenom: string;
    public datenaissance: string;
    public adresse: string;
    public genre: string;
    public statudemande: number;
    public justificatif: string;
    public cni: string;
    public photo: string;
    public adressprof: string;
    public expreriencepro: string;
    public dateinscrit: string;
    public profession: number;
    public email: string;
    public telephone: string;
    public selected?: boolean;
    public hovered?: boolean;
}
