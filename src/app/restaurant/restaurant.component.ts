import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Restaurant } from '../shared/restaurant.model';
import { ApiService } from '../shared/api.service';
import { DetailRestaurantModalComponent } from './detail-restaurant-modal/detail-restaurant-modal.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurante: Restaurant[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailRestaurantModal') detailRestaurantModal: DetailRestaurantModalComponent;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getRestaurante().subscribe((data: Restaurant[]) => {

      for (let i = 0; i < data.length; i++) {
        this.api.getRestaurant(data[i].id).subscribe((info: Restaurant) => {
          info.id = data[i].id;
          if (!info.listaImagini) {
            info.listaImagini = 'assets/24769916.jpg';
          }
        
          this.restaurante.push(info);
        },
          (e: Error) => {
            console.log('err', e);
          });
      }
    },
      (er: Error) => {
        console.log('err', er);
      });
  }

  showDM(id: number): void {
    this.detailRestaurantModal.show(id);
  }
}
