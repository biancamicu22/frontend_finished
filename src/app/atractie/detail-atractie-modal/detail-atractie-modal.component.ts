import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Atractie } from '../../shared/atractie.model';
import { ApiService } from '../../shared/api.service';
import { CartService } from '../../shared/cart.service';
import { FavouritesService } from '../../shared/favourites.service';
import { AtractiiService } from 'src/app/services/atractii.services';

@Component({
  selector: 'app-detail-atractie-modal',
  templateUrl: './detail-atractie-modal.component.html',
  styleUrls: ['./detail-atractie-modal.component.css']
})
export class DetailAtractieModalComponent implements OnInit {

  @ViewChild('detailAtractieModal') modal: ModalDirective;
  atractie = new Atractie();
  //studio: string;
  dataVizita: string = "";
  numarBilete: number;
  isLoggedIn: string;

  constructor(private api: ApiService, private cart: CartService, private favourites: FavouritesService,private atractiiService : AtractiiService) { }

  ngOnInit() {}

  show(id: number): void {
    this.getAtractie(id);
    this.modal.show();
  }

  /*getStudio(id: number) {
    this.api.getStudio(id)
      .subscribe((data: Album) => {
        this.studio = data.name;
      },
        (err: Error) => {
          console.log('err', err);

        });
  }*/

  getAtractie(id: number) {
    this.atractiiService.getAtractie(id)
      .subscribe((data: Atractie) => {
        this.atractie = data;
        this.atractie.id = id;
        if (!data.listaImagini) {
          this.atractie.listaImagini = 'assets/14219410.jpg';
        }
        //this.getStudio(this.album.studioId);
      },
        (err: Error) => {
          console.log('err', err);

        });
  }

  addCart(atractie: Atractie) {
    this.cart.add_atractie(atractie, this.dataVizita, this.numarBilete);
    //console.log(this.dataStart, "+", this.dataSfarsit);
    this.modal.hide();
  }

  addFavourites(atractie: Atractie) {
    this.favourites.add_atractie(atractie);
    this.modal.hide();
  }


}
