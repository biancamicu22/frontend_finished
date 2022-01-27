export class Atractie {
    id: number;
    denumire: string;
    oraDeschidere: string;
    oraInchidere: string;
    pret: number;
    oras: string;
    adresa: string;
    listaImagini: string;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }