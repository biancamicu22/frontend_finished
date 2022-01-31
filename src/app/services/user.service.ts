    import { Injectable } from '@angular/core';
    import { HttpClient, HttpHeaders } from '@angular/common/http';
    import { Utilizator } from '../shared/utilizator.model';
    import { UserLogin } from '../shared/userLogin.model';
    import { BehaviorSubject, Observable } from 'rxjs';
    import { UtilizatorLogat } from '../shared/UtilizatorLogat';
    import { map } from 'rxjs/operators'
    import { JwtHelperService } from '@auth0/angular-jwt';

    @Injectable({
      providedIn: 'root'
    })
    export class UserService {
      public currentUserSubject: BehaviorSubject<UtilizatorLogat>;
      public currentUser: Observable<UtilizatorLogat>;
      public isAdmin: boolean = false;
      public get currentUserValue(): UtilizatorLogat {
        return this.currentUserSubject.value;
      }
      constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
        const uData = this.GetUserData();
        if (uData && uData.token && jwtHelper.isTokenExpired(uData.token) == false) {
          this.currentUserSubject = new BehaviorSubject<UtilizatorLogat>(uData);
        }
        else {
          this.currentUserSubject = new BehaviorSubject<UtilizatorLogat>(null);
        }
        this.currentUser = this.currentUserSubject.asObservable();
      }
      header = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      baseUrl = 'https://localhost:44335';



      addUtilizator(utilizator: Utilizator) : Observable<UtilizatorLogat> {
        //pipe
        return this.http.post<UtilizatorLogat>(this.baseUrl + '/utilizator/create',utilizator, { headers: this.header }).pipe(map(user => {
          this.currentUserSubject.next(user);
          this.saveUserData(user);
          return user;
        }));;
      }

      
      getUtilizator(id: number) {
        return this.http.get(this.baseUrl + '/utilizator/' + id.toString(), { headers: this.header });
      }

      getUtilizatori() {
        return this.http.get(this.baseUrl + '/utilizator', { headers: this.header });
      }

      editUtilizator(user: Utilizator) {
        return this.http.put(this.baseUrl + '/utilizator/' + user.id.toString(), user, { headers: this.header });
      }

      deleteUtilizator(id: number) {
        return this.http.delete(this.baseUrl + '/utilizator/' + id.toString(), { headers: this.header });
      }

      login(user: UserLogin): Observable<UtilizatorLogat> {
        return this.http.post<UtilizatorLogat>(this.baseUrl + '/utilizator/authenticate', user, { headers: this.header }).pipe(map(user => {
          this.currentUserSubject.next(user);
          this.saveUserData(user);
          return user;
        }));
      }

      saveUserData(user: UtilizatorLogat) {
        localStorage.setItem("userData", JSON.stringify(user));
        localStorage.setItem("token",user.token)
      }



      public IsUserAdmin(): boolean {
        if (this.currentUserValue != null) {
          if(this.currentUserValue.role == "Admin")
             return true;
        }
        return false; 
      }

      public   GetUserRole(): string {
        if (this.currentUserValue != null) {
          return this.currentUserValue.role;
        }
        return null;
      }
      public GetUserData(): UtilizatorLogat {
        try {
          return JSON.parse(localStorage.getItem("userData"));
        }
        catch {
          return null;
        }
      }

      public DeleteUserData() {
        try {
          localStorage.removeItem("userData");
        }
        catch {
          return null;
        }
      }
    
    }

