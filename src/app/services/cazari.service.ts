import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Atractie } from '../shared/atractie.model';
import { Cazare } from '../shared/cazare.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CazariService {
  privateHeader ={
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44335';
  constructor(private http: HttpClient) {}
  
 
  

  addCazare(cazare: Cazare) {
    return this.http.post(this.baseUrl + '/cazare', {
      'nume': cazare.nume,
      'tipCazare': cazare.tipCazare,
      'pret': cazare.pret,
      'oras': cazare.oras,
      'adresa': cazare.adresa,
      'listaFacilitatiID': JSON.parse('[' + cazare.listaFacilitatiID + ']'),
      'setImagini': cazare.setImagini,
      //'listaFacilitati': JSON.parse('[' + cazare.listaFacilitati + ']')
    }, {headers: this.header });
  }

  getCazare(id: string) {
    return this.http.get(this.baseUrl + '/cazare/Id?Id=' + id.toString(), { headers: this.header });
  }
  getCazari() : Observable<Array<Cazare>> {
    return this.http.get<Array<Cazare>>(this.baseUrl + '/cazare', { headers: this.header });
  }
  editCazare(cazare: Cazare) {
    return this.http.put(this.baseUrl + '/cazare',cazare, { headers: this.privateHeader.headers });
  }
  deleteCazare(id: number) {
    return this.http.delete(this.baseUrl + '/cazare/Id?Id=' + id.toString(), { headers: this.privateHeader.headers });
  }

  getCazaryByPret() : Observable<Array<Cazare[]>>{
    return this.http.get<Array<Cazare[]>>(this.baseUrl + '/cazare/byPret', { headers: this.header });
  }
  
}

