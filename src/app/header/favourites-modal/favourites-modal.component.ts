import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Cazare } from 'src/app/shared/cazare.model';
import { FavouritesService } from 'src/app/shared/favourites.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { Atractie } from 'src/app/shared/atractie.model';
import { Restaurant } from 'src/app/shared/restaurant.model';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from '../../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites-modal',
  templateUrl: './favourites-modal.component.html',
  styleUrls: ['./favourites-modal.component.css']
})
export class FavouritesModalComponent implements OnInit, OnDestroy {

  @ViewChild('favouritesModal') modal: ModalDirective;
  cazariFavorite: Cazare[] = [];
  atractiiFavorite: Atractie[] = [];
  restauranteFavorite: Restaurant[] = [];
  success: boolean;
  logged: boolean = false;

  constructor(private favouritesService: FavouritesService, private api: ApiService, private data: LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userData") != "null"){
      this.logged = true;
    }
  }

  ngOnDestroy() {
  }

  show(value: boolean) {
    if(value == true){
      this.logged = true;
    }
    this.modal.show();
    var result = this.favouritesService.get();
    this.cazariFavorite = result[0] as Cazare[];
    this.atractiiFavorite = result[1] as Atractie[];
    this.restauranteFavorite = result[2] as Restaurant[];
  }

  delete(id: number) {
    if (id <= this.cazariFavorite.length) {
      this.cazariFavorite.splice(id);
    }
    else if (id >= this.cazariFavorite.length && id <= (this.cazariFavorite.length + this.atractiiFavorite.length)) {
      this.atractiiFavorite.splice(id - this.cazariFavorite.length - 1);
    }
    else {
      this.restauranteFavorite.splice(id - this.cazariFavorite.length - this.atractiiFavorite.length - 1);
    }
  }

}
