export class TichetMasa {
    id: number;
    vacantaID: number;
    vacantaDenumire: string;
    restaurantID: number;
    restaurantNume: string;
    codTichet: string;
    dataVizita: Date;
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }