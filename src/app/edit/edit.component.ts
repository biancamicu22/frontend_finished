import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { EditCazareModalComponent } from './edit-cazare-modal/edit-cazare-modal.component';
import { EditArtistModalComponent } from './edit-artist-modal/edit-artist-modal.component';
import { EditSongModalComponent } from './edit-song-modal/edit-song-modal.component';
import { Cazare } from '../shared/cazare.model';
import { Restaurant } from '../shared/restaurant.model';
import { Atractie } from '../shared/atractie.model';
import { EditRestaurantModalComponent } from './edit-restaurant-modal/edit-restaurant-modal.component';
import { EditAtractieModalComponent } from './edit-atractie-modal/edit-atractie-modal.component';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AtractiiService } from '../services/atractii.services';
import { CazariService } from '../services/cazari.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  atractii: Atractie[] = [];
  cazari: Cazare[] = [];
  restaurante: Restaurant[] = [];
  logged: boolean = false;
  role : boolean = false;


  @ViewChild('editCazareModal') editCazareModal: EditCazareModalComponent;
  @ViewChild('editRestaurantModal') editRestaurantModal: EditRestaurantModalComponent;
  @ViewChild('editArtistModal') editArtistModal: EditArtistModalComponent;
  @ViewChild('editAtractieModal') editAtractieModal: EditAtractieModalComponent;
  @ViewChild('LoginComponent') loginPage: LoginComponent;


  constructor(private api: ApiService, private data: LoginService,private atractiiService : AtractiiService,private cazareService :CazariService, private userService : UserService) { }

  ngOnInit() {
    console.log(localStorage.getItem('token'))
    this.getCazari();
    this.getAtractii();
    if(localStorage.getItem("userData")!= "null"){
      this.logged = true;
      this.role=this.userService.IsUserAdmin();
    }
  }

  ngOnDestroy() {
  }

  getCazari() {
    this.cazareService.getCazari()
      .subscribe((data: Cazare[]) => {
        this.cazari = [];

        for (let i = 0; i < data.length; i++) {
          this.cazareService.getCazare(data[i].id.toString())
            .subscribe((info: Cazare) => {
              info.id = data[i].id;
              this.cazari.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  getAtractii() {
    this.atractiiService.getAtractii()
      .subscribe((data: Atractie[]) => {
        this.atractii = [];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.atractiiService.getAtractie(data[i].id)
            .subscribe((info: Atractie) => {
              info.id = data[i].id;
              
              this.atractii.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  // getRestaurante() {
  //   this.api.getRestaurante()
  //     .subscribe((data: Restaurant[]) => {
  //       this.restaurante = [];

  //       for (let i = 0; i < data.length; i++) {
  //         this.api.getRestaurant(data[i].id)
  //           .subscribe((info: Restaurant) => {
  //             info.id = data[i].id;
  //             this.restaurante.push(info);
  //           },
  //             (e: Error) => {
  //               console.log('err', e);
  //             });
  //       }

  //     },
  //       (error: Error) => {
  //         console.log('err', error);

  //       });
  // }

  /*getSongs() {
    this.api.getSongs()
      .subscribe((data: Song[]) => {
        this.songs = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }*/

  deleteCazare(id: number) {
    this.cazareService.deleteCazare(id)
      .subscribe(() => {
        this.cazari = [];
        this.getCazari();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteAtractie(id: number) {
    this.atractiiService.deleteAtractie(id)
      .subscribe(() => {
        this.getAtractii();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  // deleteRestaurant(id: number) {
  //   this.api.deleteRestaurant(id)
  //     .subscribe(() => {
  //       this.getRestaurante();
  //     },
  //       (error: Error) => {
  //         console.log(error);
  //       });

  // }

  showM1(id: number): void {
    this.editCazareModal.show(id);
  }

  showM2(id: number): void {
    this.editAtractieModal.show(id);
  }

  showM3(id: number): void {
    this.editRestaurantModal.show(id);
  }

  changeE(event: string) {
    if (event === 'cazare') {
      this.getCazari();
    }
    if (event === 'atractie') {
      this.getAtractii();
    }
   
  }

}
