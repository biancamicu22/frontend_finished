export class Meniu {
    id: number;
    restaurantID: number;
    mancareID: number;
    restaurantNume: string;
    mancareDenumire: string;
    pret: number;
    oras: string;
    adresa: string;
    listaImagini: string[];
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }