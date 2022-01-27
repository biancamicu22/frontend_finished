export class UserLogin {
    username: string;
    password: string;
    constructor(input?: any) {
      Object.assign(this, input);
    }
  }