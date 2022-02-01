import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bilet } from '../shared/bilet.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BiletService {
  baseUrl = 'https://localhost:44335';
  constructor(private http: HttpClient) {}
  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  addBilet(bilet: Bilet) {
    return this.http.post(this.baseUrl + '/bilet',bilet, {headers: this.header });
  }

  getBilet(id: string) {
    return this.http.get(this.baseUrl + '/bilet/Id?Id=' + id.toString(), { headers: this.header });
  }

  getBilete() : Observable<Array<Bilet>> {
    return this.http.get<Array<Bilet>>(this.baseUrl + '/bilet', { headers: this.header });
  }
  editBilet(bilet: Bilet) {
    return this.http.put(this.baseUrl + '/bilet',bilet, { headers:  this.header });
  }
  deleteBilet(id: number) {
    return this.http.delete(this.baseUrl + '/bilet/Id?Id=' + id.toString(), { headers:  this.header });
  }
  getTicketsBetweenRangeDate() : Observable<Array<Bilet>>{
    return this.http.get<Array<Bilet>>(this.baseUrl + '/bilet/ticketsBetweenRangeDate', { headers: this.header });
  }
}