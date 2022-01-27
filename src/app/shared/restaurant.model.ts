export class Restaurant {
    id: number;
    nume: string;
    oraDeschidere: string;
    oraInchidere: string;
    oras: string;
    adresa: string;
    meniuID: number[];
    meniu: string[];
    preturiMeniu: number[];
    listaImagini: string;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
}