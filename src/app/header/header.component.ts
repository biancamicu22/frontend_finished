import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { FavouritesModalComponent } from './favourites-modal/favourites-modal.component';
import { LoginService } from '../login.service';
import { Utils } from 'angular-bootstrap-md/lib/free/utils';
import { UtilizatorLogat } from '../shared/UtilizatorLogat';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  logged: boolean = false;
  username: string = "";
  user: UtilizatorLogat;
  role : boolean = false;
  @ViewChild('cartModal') detailModal: CartModalComponent;
  @ViewChild('favouritesModal') favdetailModal: FavouritesModalComponent;

  constructor(private data: LoginService,private userService : UserService) { }

  ngOnInit() {
    if (localStorage.getItem("userData") != "null") {
      this.logged = true;
      this.user = JSON.parse(localStorage.getItem("userData"));
      this.username = this.user.username;
      this.role=this.userService.IsUserAdmin();
    }
  }

  ngOnDestroy() {
  }

  openCart() {
    let value = false;
    if (localStorage.getItem("userData") != "null") {
      value = true;
    }
    this.detailModal.totalFinal = 0;
    this.detailModal.show(value);
  }

  openFavourites() {
    let value = false;
    if (localStorage.getItem("userData") != "null") {
      value = true;
    }
    this.favdetailModal.show(value);
  }

  logoutUser() {
    this.logged = false;
    localStorage.setItem("userData", null);
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}