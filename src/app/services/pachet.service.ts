import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Atractie } from '../shared/atractie.model';
import { Cazare } from '../shared/cazare.model';
import { Pachet } from '../shared/pachet.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PachetService {
  baseUrl = 'https://localhost:44335';
  constructor(private http: HttpClient) {}
  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  addPachet(pachet: Pachet) {
    console.log(pachet);
    return this.http.post(this.baseUrl + '/pachet',pachet, {headers: this.header });
  }

  getPachet(id: string) {
    return this.http.get(this.baseUrl + '/pachet/Id?Id=' + id.toString(), { headers: this.header });
  }

  getPachete() : Observable<Array<Pachet>> {
    return this.http.get<Array<Pachet>>(this.baseUrl + '/pachet', { headers: this.header });
  }
  editPachet(Pachet: Pachet) {
    return this.http.put(this.baseUrl + '/pachet',Pachet, { headers:  this.header });
  }
  deletePachet(id: number) {
    return this.http.delete(this.baseUrl + '/pachet/Id?Id=' + id.toString(), { headers:  this.header });
  }
}

