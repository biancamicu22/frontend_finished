import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private loginReference = new BehaviorSubject(false);
  private loginReference1 = new BehaviorSubject(null);
  currentValue = this.loginReference.asObservable();
  currentValue1 = this.loginReference1.asObservable();

  constructor() { }

  changeLoginValue(loginValue: boolean, username: string) {
    this.loginReference.next(loginValue);
    this.loginReference1.next(username);
  }
}
