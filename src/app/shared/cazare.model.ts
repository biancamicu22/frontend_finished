export class Cazare {
    id: number;
    nume: string;
    tipCazare: string;
    pret: number;
    oras: string;
    adresa: string;
    setImagini: string;
    listaFacilitatiID: number[];
    listaFacilitati: string[];
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }

  /*export class CazareDTO {
    nume: string;
    tipCazare: string;
    pret: number;
    oras: string;
    adresa: string;
    listaFacilitatiID: number[];

    constructor(input?: any) {
      Object.assign(this, input);
    }
  }*/