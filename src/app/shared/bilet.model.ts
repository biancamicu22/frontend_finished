export class Bilet {
    id: number;
    vacantaID: number;
    vacantaDenumire: string;
    atractieID: number;
    atractieDenumire: string;
    codBilet: string;
    dataVizita: Date;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }