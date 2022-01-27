
import {Injectable} from '@angular/core';
import { Atractie } from './atractie.model';
import { Cazare } from './cazare.model';
import { Restaurant } from './restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cazari: Cazare[] =[];
  atractii: Atractie[] = [];
  restaurante: Restaurant[] = [];
  dataStartCazare: string[] = [];
  dataSfarsitCazare: string[] = [];
  dataVizitaAtractie: string[] = [];
  numarBilete: number[] = [];
  dataRezervareRestaurant: string[] = [];
  numarPersoane: number[] = [];


  constructor() { }

  
  add_cazare(cazare: Cazare, datastartcazare: string, datasfarsitcazare: string) {
    this.cazari.push(cazare);
    this.dataStartCazare.push(datastartcazare);
    this.dataSfarsitCazare.push(datasfarsitcazare);

  }

  add_atractie(atractie: Atractie, databilet: string, nrbilete: number) {
    this.atractii.push(atractie);
    this.dataVizitaAtractie.push(databilet);
    this.numarBilete.push(nrbilete);
  }

  add_restaurant(restaurant: Restaurant, datarezervare: string, orarezervare: string, nrpers: number) {
    let datarezervareCompleta = datarezervare + "T" + orarezervare;
    this.restaurante.push(restaurant);
    this.dataRezervareRestaurant.push(datarezervareCompleta);
    this.numarPersoane.push(nrpers);
  }

  get() {
    return [this.cazari, this.dataStartCazare, this.dataSfarsitCazare, this.atractii, this.dataVizitaAtractie, this.numarBilete, this.restaurante, this.dataRezervareRestaurant, this.numarPersoane];
  }


}
