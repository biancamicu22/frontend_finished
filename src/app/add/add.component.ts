import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';
import { Cazare } from '../shared/cazare.model';
import { Restaurant } from '../shared/restaurant.model';
import { AtractiiService } from '../services/atractii.services';
import { CazariService } from '../services/cazari.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addCazareForm: FormGroup;
  addAtractieForm: FormGroup;
  addRestaurantForm: FormGroup;
  addMancareForm: FormGroup;
  addFacilitateForm: FormGroup;
  success: boolean;
  logged: boolean = false;

  constructor(public fb: FormBuilder, private api: ApiService, private cazareService :CazariService,private atractiiService : AtractiiService, private data: LoginService) { }


  ngOnInit() {

    this.addCazareForm = this.fb.group({
      nume: [null, Validators.required],
      tipCazare: [null, Validators.required],
      pret: [null, Validators.required],
      oras: [null, Validators.required],
      adresa: [null, Validators.required],
      listaFacilitatiID: ['', Validators.required]
    });
    this.addAtractieForm = this.fb.group({
      denumire: [null, Validators.required],
      oraDeschidere: [null, Validators.required],
      oraInchidere: [null, Validators.required],
      pret: [null, Validators.required],
      oras: [null, Validators.required],
      adresa: [null, Validators.required],
    });
    this.addMancareForm = this.fb.group({
      denumire: [null, Validators.required],
    });
    this.addFacilitateForm = this.fb.group({
      denumire: [null, Validators.required],
    });
    this.addRestaurantForm = this.fb.group({
      nume: [null, Validators.required],
      oraDeschidere: [null, Validators.required],
      oraInchidere: [null, Validators.required],
      oras: [null, Validators.required],
      adresa: [null, Validators.required],
      meniuID: ['', Validators.required],
    });
    if(localStorage.getItem("userData") != "null"){
      this.logged = true;
    }
  }

  ngOnDestroy() {
  }

  addNewAtractie() {
  
    this.atractiiService.addAtractie(this.addAtractieForm.value).subscribe(() => {

      this.success = true;
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

  addNewCazare() {

    const addedCazare = new Cazare({
      nume: this.addCazareForm.value.nume,
      tipCazare: this.addCazareForm.value.tipCazare,
      pret: this.addCazareForm.value.pret,
      adresa: this.addCazareForm.value.adresa,
      oras: this.addCazareForm.value.oras,
      listaFacilitatiID: this.transformInNumberArray(this.addCazareForm.value.listaFacilitatiID),
    });
  
    this.cazareService.addCazare(addedCazare).subscribe(() => {

      this.success = true;
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


  addNewFacilitate() {
  
    this.api.addFacilitate(this.addFacilitateForm.value).subscribe(() => {

      this.success = true;
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

  addNewMancare() {
  
    this.api.addMancare(this.addMancareForm.value).subscribe(() => {

      this.success = true;
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


  addNewRestaurant() {

    const addedRestaurant = new Restaurant({
      nume: this.addRestaurantForm.value.nume,
      oraDeschidere: this.addRestaurantForm.value.oraDeschidere,
      oraInchidere: this.addRestaurantForm.value.OraInchidere,
      adresa: this.addRestaurantForm.value.adresa,
      oras: this.addRestaurantForm.value.oras,
      meniuID: this.transformInNumberArray(this.addRestaurantForm.value.meniuID),
    });
  
    this.api.addRestaurant(addedRestaurant).subscribe(() => {

      this.success = true;
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

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }
}
