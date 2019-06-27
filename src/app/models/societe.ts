export class Societe {
    nom: string;
    adresse: string;
    siren: string;

    constructor(siren: string, nom: string, adresse: string){
        this.nom = nom;
        this.adresse = adresse;
        this.siren = siren;
    }
  }
  
  