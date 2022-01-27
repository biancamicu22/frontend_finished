export class Pachet {
    id: number;
    cazareID: number;
    facilitateID: number;
    
  
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }