import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Atractie } from '../shared/atractie.model';

@Injectable({
  providedIn: 'root'
})
export class AtractiiService {
 
  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44335';
  privateHeader ={
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  time = {
    "Hours":16,
    "Minutes":8,
    "Seconds":45,
    "Milliseconds":0,
    "Ticks":581250000000,
    "Days":0,
    "TotalDays":0.6727430555555556,
    "TotalHours":16.145833333333332,
    "TotalMilliseconds":58125000,
    "TotalMinutes":968.75,
    "TotalSeconds":58125
   };


  addAtractie(atr: Atractie) {
    var starTime = "";
    this.time.Hours = parseInt(starTime[0]);
    this.time.Minutes = parseInt(starTime[1]);
    var startDate = this.time;
    var endTime = "";
    this.time.Hours = parseInt(endTime[0]);
    this.time.Minutes = parseInt(endTime[1]);
    var endDate = this.time
    return this.http.post(this.baseUrl + '/atractie', {
      'denumire': atr.denumire,
      'oraDeschidere': startDate,
      'oraInchidere': endDate,
      'pret': atr.pret,
      'oras': atr.oras,
      'adresa': atr.adresa,
      'listaImagini': atr.listaImagini,
    }, {headers: this.header})
  }

  getAtractie(id: number) {
    return this.http.get(this.baseUrl + '/atractie/Id?Id=' + id.toString(), { headers: this.header });
  }
  editAtractie(atractie: Atractie) {
    return this.http.put(this.baseUrl + '/atractie', atractie, { headers: this.privateHeader.headers });
  }
 
  deleteAtractie(id: number) {
    return this.http.delete(this.baseUrl + '/atractie/Id?Id=' + id.toString(), {headers: this.privateHeader.headers });
  }
  getAtractii() {
    return this.http.get(this.baseUrl + '/atractie', { headers: this.header });
  }

}

