import { Injectable } from '@angular/core';
import { Atractie } from './atractie.model';
import { Cazare } from './cazare.model';
import { Restaurant } from './restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  cazari: Cazare[] =[];
  atractii: Atractie[] = [];
  restaurante: Restaurant[] = [];

  constructor() { }

  add_cazare(cazare: Cazare) {
    this.cazari.push(cazare);

  }

  add_atractie(atractie: Atractie) {
    this.atractii.push(atractie);
  }

  add_restaurant(restaurant: Restaurant) {
    this.restaurante.push(restaurant);
  }

  get() {
    return [this.cazari, this.atractii, this.restaurante];
  }
}
