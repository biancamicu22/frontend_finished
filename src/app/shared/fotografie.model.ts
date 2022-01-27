export class Fotografie {
    id: number;
    titlu: string;
    data: string;
    utilizatorID: number;
    url: string;

    
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }