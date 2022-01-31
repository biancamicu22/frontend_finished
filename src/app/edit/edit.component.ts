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
import { PachetService } from '../services/pachet.service';
import { Pachet } from '../shared/pachet.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Facilitate } from '../shared/facilitate.model';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  atractii: Atractie[] = [];
  cazari = new Array<Cazare>();
  facilitate: Facilitate
  restaurante: Restaurant[] = [];
  logged: boolean = false;
  role : boolean = false;
  cazariPret : Array<Cazare[]>
  pachete = new Array<Pachet>()
  cazariByPret = new Map<number,Cazare>()
  keys = Array<number>()
  @ViewChild('editCazareModal') editCazareModal: EditCazareModalComponent;
  @ViewChild('editRestaurantModal') editRestaurantModal: EditRestaurantModalComponent;
  @ViewChild('editArtistModal') editArtistModal: EditArtistModalComponent;
  @ViewChild('editAtractieModal') editAtractieModal: EditAtractieModalComponent;
  @ViewChild('LoginComponent') loginPage: LoginComponent;


  constructor(private pachet: PachetService, private api: ApiService, private data: LoginService,private atractiiService : AtractiiService,private cazareService :CazariService, private userService : UserService) { }

  ngOnInit() {
    // this.cazareService.getCazaryByPret().subscribe(res=>
    //   {
    //     this.cazariPret = res;
    //     for(let i = 0;i< this.cazariPret.length; i++){
    //       for(let j=0; j< this.cazariPret[i].length; j++){
    //         this.cazariByPret.set(this.cazariPret[i][j].pret, this.cazariPret[i][j]);
    //         this.keys[i] = this.cazariPret[i][j].pret;
    //       }
    //     }
    //       console.log(this.cazariByPret)
    //   })

    this.getPachet();
    this.getCazari();
    this.getAtractii();
    if(localStorage.getItem("userData")!= "null"){
      this.logged = true;
      this.role=this.userService.IsUserAdmin();
    }
  }

  ngOnDestroy() {
  }
  getPachet(){
    
  }
  getCazari() {
  this.cazareService.getCazari()
    .subscribe((data: Cazare[]) => {
      this.cazari = data;
      this.pachet.getPachete().subscribe(res=>{
        this.pachete = res;
        for(let i = 0; i< this.cazari.length; i++){
          this.cazari[i].listaFacilitatiID = new Array<number>()
          this.cazari[i].listaFacilitati = new Array<string>()
          let l : number =0;
          for(let j =0;j< this.pachete.length; j++){
            if(this.cazari[i].id == this.pachete[j].cazareID){
               this.cazari[i].listaFacilitatiID[l] = this.pachete[j].facilitateID;
               l++;
            }
            }
          }
        })
      // this.pachet.getPachete().subscribe(res=>{
      //   let pachete  = new Array<Pachet>()
      //   Object.assign(pachete,res);
      //   for (let i = 0; i < data.length; i++) {
      //     this.cazareService.getCazare(data[i].id.toString())
      //       .subscribe((info: Cazare) => {
      //         info.id = data[i].id;
      //         info.listaFacilitatiID = new Array<number>()
      //         let l : number =0;
      //         for(let j =0 ; j< pachete.length; j++){
      //           if(pachete[j].cazareID = data[i].id){
      //             let x = ""
      //               // this.api.getFacilitate(pachete[j].facilitateID).subscribe(res=> {
      //               //   info.listaFacilitati[l] = res["denumire"]
      //               // })       
      //               info.listaFacilitatiID[l] = pachete[j].facilitateID              
      //               l++
      //             }
      //         }
      //         console.log(info)
      //         this.cazari.push(info)
      //       },
      //         (e: Error) => {
      //           console.log('err', e);
      //         });
      //   }
      // })
    })
    
  }

  


  getAtractii() {
    this.atractiiService.getAtractii()
      .subscribe((data: Atractie[]) => {
        this.atractii = [];
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
// getCazari() {
//   this.cazareService.getCazari()
//     .subscribe((data: Cazare[]) => {
//       this.cazari = [];
//       this.pachet.getPachete().subscribe(res=>{
//         let pachete  = new Array<Pachet>()
//         Object.assign(pachete,res);
//         for (let i = 0; i < data.length; i++) {
//           this.cazareService.getCazare(data[i].id.toString())
//             .subscribe((info: Cazare) => {
//               info.id = data[i].id;
//               info.listaFacilitati = new Array<string>()
//               for(let j =0 ; j< pachete.length; j++){
//                 let l : number =-1;
//                 if(pachete[j].cazareID = data[i].id){
//                   let x = ""
//                     this.api.getFacilitate(pachete[j].facilitateID).subscribe(res=> {
//                       info.listaFacilitati[l] = res["denumire"]
//                     })                    
//                     l++
//                   }
//                   console.log(info)
//                   this.cazari.push(info)
//               }
//             },
//               (e: Error) => {
//                 console.log('err', e);
//               });
//         }
//       })
//     },