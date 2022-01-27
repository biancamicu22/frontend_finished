export class Vacanta {
    id: number;
    denumire: string;
    dataInceput: string;
    dataSfarsit: string;
    oras: string;
    tara: string;

  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }