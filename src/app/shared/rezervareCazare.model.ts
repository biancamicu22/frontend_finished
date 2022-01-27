export class RezervareCazare {
    id: number;
    vacantaID: number;
    vacantaDenumire: string;
    cazareID: number;
    cazareDenumire: string;
    dataSosire: Date;
    dataPlecare: Date;
    codRezervare: string;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }