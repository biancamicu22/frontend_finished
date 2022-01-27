export class UtilizatorLogat {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }