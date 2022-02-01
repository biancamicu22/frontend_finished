export class CazareRezervare {
    id: number;
    nume: string;
    tipCazare: string;
    pret: number;
    oras: string;
    adresa: string;
    rezervareCazare : Array<RezervareCazare>         
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }

  export class RezervareCazare{
    cazareID: string
    codRezervare: string
    dataPlecare: string
    dataSosire: string
    id: string
    vacanta: string
    vacantaID: string
    constructor(input?: any) {
        Object.assign(this, input);
      }
  }
