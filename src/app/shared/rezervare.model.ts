export class Rezervare {
    id: number;
    utilizatorID: number;
    utilizatorUsername: string;
    vacantaID: number;
    vacantaDenumire: string;
    dataRezervare: Date;
    review: string;
    rating: number;
    vacantaDataInceput: Date;
    vacantaDataSfarsit: Date;
    listaAtractii: string[];
    listaCazari: string[];
    listaRestaurante: string[];
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }