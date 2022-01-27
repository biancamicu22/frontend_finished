import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Cazare } from 'src/app/shared/cazare.model';
import { CartService } from 'src/app/shared/cart.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { ChooseVacationModalComponent } from './choose-vacation-modal/choose-vacation-modal.component';
import { Atractie } from 'src/app/shared/atractie.model';
import { Restaurant } from 'src/app/shared/restaurant.model';
import { LoginComponent } from 'src/app/login/login.component';
import { LoginService } from '../../login.service';
import { Subscription } from 'rxjs';
import { Vacanta } from '../../shared/vacanta.model';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css']
})

export class CartModalComponent implements OnInit, OnDestroy {

  @ViewChild('cartModal') modal: ModalDirective;
  @ViewChild('chooseVacationModal') vacationModal: ChooseVacationModalComponent;
  @ViewChild('LoginComponent') loginPage: LoginComponent;
  rezervariCazari: Cazare[] = [];
  dateStart: string[] = [];
  dateSfarsit: string[] = [];
  rezervariAtractii: Atractie[] = [];
  numarBilete: number[] = [];
  dateViziteAtractii: string[] = [];
  rezervariRestaurante: Restaurant[] = [];
  dateRezervariRestaurante: string[] = [];
  numarPersoane: number[] = [];
  totalFinal = 0;
  differenceBetweenDates: number[] = [];
  totalCazare: number[] = [];
  totalAtractie: number[] = [];
  idVacanta: number = 0;
  success: boolean;
  logged: boolean = false;
  subscription: Subscription;
  vacanta = new Vacanta();
  cannotAdd = false;


  constructor(private cartService: CartService, private api: ApiService, private data: LoginService) { }

  ngOnInit() {
    if(localStorage.getItem("userData")!= "null"){
      this.logged = true;
    }
  }

  ngOnDestroy() {
  }

  show(value : boolean) {
    if(value == true){
      this.logged = true;
    }
    this.modal.show();
    var result = this.cartService.get();
    this.rezervariCazari = result[0] as Cazare[];
    this.dateStart = result[1] as string[];
    this.dateSfarsit = result[2] as string[];
    this.rezervariAtractii = result[3] as Atractie[];
    this.dateViziteAtractii = result[4] as string[];
    this.numarBilete = result[5] as number[];
    this.rezervariRestaurante = result[6] as Restaurant[];
    this.dateRezervariRestaurante = result[7] as string[];
    this.numarPersoane = result[8] as number[];
    var oneDay = 24 * 60 * 60 * 1000;
    for (let i = 0; i < this.rezervariCazari.length; i++) {
      var firstDate = Date.parse(this.dateStart[i]);
      var secondDate = Date.parse(this.dateSfarsit[i]);
      this.differenceBetweenDates[i] = Math.round(Math.abs((firstDate - secondDate) / oneDay));
      this.totalCazare[i] = this.rezervariCazari[i].pret * this.differenceBetweenDates[i];
    }
    console.log(this.rezervariCazari);
    console.log("total inainte de iterare: " + this.totalFinal);
    for (let i = 0; i < this.totalCazare.length; i++) {
      console.log("am intrat in for cazare pt total final");
      console.log(this.totalCazare);
      this.totalFinal += this.totalCazare[i];
    }

    for (let i = 0; i < this.rezervariAtractii.length; i++) {
      this.totalAtractie[i] = this.rezervariAtractii[i].pret * this.numarBilete[i];
    }
    for (let i = 0; i < this.totalAtractie.length; i++) {
      this.totalFinal += this.totalAtractie[i];
    }
    console.log("total dupa iterare: " + this.totalFinal);

  }

  delete(id: number, pret: number) {
    if (id <= this.rezervariCazari.length) {
      console.log("id-ul recordului de sters: " + id);
      this.rezervariCazari.splice(id, 1);
      this.dateStart.splice(id, 1);
      this.dateSfarsit.splice(id, 1);
      this.totalCazare.splice(id, 1);
      console.log("rezervari ramase dupa stergere " + this.rezervariCazari);
    }
    else if (id >= this.rezervariCazari.length && id <= (this.rezervariCazari.length + this.rezervariAtractii.length)) {
      this.rezervariAtractii.splice(id - this.rezervariCazari.length - 1, 1);
      this.dateViziteAtractii.splice(id - this.rezervariCazari.length - 1, 1);
      this.numarBilete.splice(id - this.rezervariCazari.length - 1, 1);
      this.totalAtractie.splice(id - this.rezervariCazari.length - 1, 1);
    }
    else {
      this.rezervariRestaurante.splice(id - this.rezervariCazari.length - this.rezervariAtractii.length - 1, 1);
      this.dateRezervariRestaurante.splice(id - this.rezervariCazari.length - this.rezervariAtractii.length - 1, 1);
      this.numarPersoane.splice(id - this.rezervariCazari.length - this.rezervariAtractii.length - 1, 1);
    }
    console.log("pret inainte de stergere " + this.totalFinal);
    this.totalFinal = this.totalFinal - pret;
    console.log("pret dupa stergere " + this.totalFinal);

  }

  makeid(length: number) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-*/@#$&\`~';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
    }
    return result.join('');
  }

  resetCannotAdd() {
    setTimeout(() => {
      this.cannotAdd = false;
    }, 3000);
  }


  addRezervareC() {
    let date: any = {};
    date.vacantaID = this.vacationModal.get();
    this.api.getVacanta(date.vacantaID)
      .subscribe((info: Vacanta) => {
        info.id = date.vacantaID;
        this.vacanta = info;

        console.log("vacanta obtinuta", this.vacanta);
    console.log("printeaza data de inceput a vacantei", this.vacanta.dataInceput);
    var dataVacantaI = new Date(this.vacanta.dataInceput);
    var dataVacantaS = new Date(this.vacanta.dataSfarsit);
    for (let i = 0; i < this.rezervariCazari.length; i++) {
      var dataVizitaSt = new Date(this.dateStart[i]);
      var dataVizitaSf = new Date(this.dateSfarsit[i]);
      console.log("printez datele");
      console.log(dataVacantaI);
      console.log(dataVacantaS);
      if (dataVizitaSt < dataVacantaI || dataVizitaSf > dataVacantaS) {
        this.cannotAdd = true;
        this.resetCannotAdd();
        break;
        
      }
      date.cazareID = this.rezervariCazari[i].id;
      date.codRezervare = this.makeid(6);
      date.dataPlecare = this.dateSfarsit[i];
      date.dataSosire = this.dateStart[i];

      this.api.addRezervareCazare(date).subscribe(() => {

        this.success = true;
        this.delete(i, this.totalCazare[i]);
        setTimeout(() => {
          this.success = null;
        }, 3000);
      },
        (error: Error) => {
          console.log(error);
          this.success = false;
          setTimeout(() => {
            this.success = null;
          }, 3000);
        });
    }
    console.log("verificare intre date");
    console.log(this.cannotAdd);
    console.log(date.vacantaID);
    console.log(date.cazareID);
    console.log(date.codRezervare);
    console.log(date.dataSosire);
    console.log(date.dataPlecare);
      },
        (e: Error) => {
          console.log('err', e);
        });
  }


  addTichetM() {
    let date: any = {};
    date.vacantaID = this.vacationModal.get();
    this.api.getVacanta(date.vacantaID)
      .subscribe((info: Vacanta) => {
        info.id = date.vacantaID;
        this.vacanta = info;

        console.log("vacanta obtinuta", this.vacanta);
    console.log("printeaza data de inceput a vacantei", this.vacanta.dataInceput);
    var dataVacantaI = new Date(this.vacanta.dataInceput);
    var dataVacantaS = new Date(this.vacanta.dataSfarsit);
    for (let i = 0; i < this.rezervariRestaurante.length; i++) {
      var dataVizita = new Date(this.dateRezervariRestaurante[i]);
      console.log("printez datele");
      console.log(dataVacantaI);
      console.log(dataVacantaS);
      console.log(dataVizita);
      if (dataVizita < dataVacantaI || dataVizita > dataVacantaS) {
        this.cannotAdd = true;
        this.resetCannotAdd();
        break;
      }
      date.restaurantID = this.rezervariRestaurante[i].id;
      date.codTichet = this.makeid(8);
      date.dataVizita = this.dateRezervariRestaurante[i];

      this.api.addTichetMasa(date).subscribe(() => {

        this.success = true;
        this.delete(i + this.rezervariCazari.length + this.rezervariAtractii.length + 1, 0);
        setTimeout(() => {
          this.success = null;
        }, 3000);
      },
        (error: Error) => {
          console.log(error);
          this.success = false;
          setTimeout(() => {
            this.success = null;
          }, 3000);
        });
    }
    console.log("verificare intre date");
    console.log(this.cannotAdd);
    console.log(date.vacantaID);
    console.log(date.restauranyID);
    console.log(date.codTichet);
    console.log(date.dataVizita);
      },
        (e: Error) => {
          console.log('err', e);
        });
  }


  addBiletA() {
    let date: any = {};
    date.vacantaID = this.vacationModal.get();
    this.api.getVacanta(date.vacantaID)
      .subscribe((info: Vacanta) => {
        info.id = date.vacantaID;
        this.vacanta = info;

        console.log("vacanta obtinuta", this.vacanta);
    console.log("printeaza data de inceput a vacantei", this.vacanta.dataInceput);
    var dataVacantaI = new Date(this.vacanta.dataInceput);
    var dataVacantaS = new Date(this.vacanta.dataSfarsit);
    for (let i = 0; i < this.rezervariAtractii.length; i++) {
      var dataVizita = new Date(this.dateViziteAtractii[i]);
      console.log("printez datele");
      console.log(dataVacantaI);
      console.log(dataVacantaS);
      console.log(dataVizita);
      if (dataVizita < dataVacantaI || dataVizita > dataVacantaS) {
        this.cannotAdd = true;
        this.resetCannotAdd();
        break;
      }
      date.atractieID = this.rezervariAtractii[i].id;
      date.codBilet = this.makeid(10);
      date.dataVizita = this.dateViziteAtractii[i];

      this.api.addBilet(date).subscribe(() => {

        this.success = true;
        this.delete(i + this.rezervariCazari.length + 1, this.totalAtractie[i]);
        setTimeout(() => {
          this.success = null;
        }, 3000);
      },
        (error: Error) => {
          console.log(error);
          this.success = false;
          setTimeout(() => {
            this.success = null;
          }, 3000);
        });
    }
    console.log("verificare intre date");
    console.log(this.cannotAdd);
    console.log(date.vacantaID);
    console.log(date.atractieID);
    console.log(date.codBilet);
    console.log(date.dataVizita);
      },
        (e: Error) => {
          console.log('err', e);
        });
    
  }

  doLater() {
    setTimeout(() => {
      this.addRezervareC();
      this.addTichetM();
      this.addBiletA();
    }, 5000);
  }

}
