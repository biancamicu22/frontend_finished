import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Restaurant } from '../../shared/restaurant.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Mancare } from 'src/app/shared/mancare.model';

@Component({
  selector: 'app-edit-restaurant-modal',
  templateUrl: './edit-restaurant-modal.component.html',
  styleUrls: ['./edit-restaurant-modal.component.css']
})
export class EditRestaurantModalComponent implements OnInit {


  @ViewChild('editRestaurantModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editRestaurantForm: FormGroup;
  restaurantCurent = new Restaurant();
  foods: Mancare[] = [];
  foodsNames: string[] = [];
  foodsSelectedOptions: number[] = [];

  constructor(public fb: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.getToateMancarurile();
  }

  getToateMancarurile() {
    this.api.getMancaruri()
      .subscribe((data: Mancare[]) => {
        this.foods = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getMancare(data[i].id)
            .subscribe((info: Mancare) => {
              info.id = data[i].id;
              this.foods.push(info);

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

  listOfFoods() {
    for (let i = 0; i < this.foods.length; i++) {
      this.foodsNames.push(this.foods[i].denumire);
    }
  }

  show(id: number): void {
    this.modal.show();
    this.api.getRestaurant(id)
      .subscribe((data: Restaurant) => {
        this.restaurantCurent = data;
        this.restaurantCurent.id = id;
        this.initializeFrom(this.restaurantCurent);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(restaurantCurent: Restaurant) {
    this.editRestaurantForm = this.fb.group({
      nume: [restaurantCurent.nume, Validators.required],
      oraDeschidere: [restaurantCurent.oraDeschidere, Validators.required],
      oraInchidere: [restaurantCurent.oraInchidere, Validators.required],
      adresa: [restaurantCurent.adresa, Validators.required],
      oras: [restaurantCurent.oras, Validators.required],
      meniuID: ['', Validators.required],
    });
  }

  editRestaurant() {

    const editedRestaurant = new Restaurant({
      id: this.restaurantCurent.id,
      nume: this.editRestaurantForm.value.nume,
      oraDeschidere: this.editRestaurantForm.value.oraDeschidere,
      oraInchidere: this.editRestaurantForm.value.oraInchidere,
      adresa: this.editRestaurantForm.value.adresa,
      oras: this.editRestaurantForm.value.oras,
      meniuID: this.transformInNumberArray(this.editRestaurantForm.value.meniuID),
    });

    //console.log(this.editCazareForm.value.listaFacilitati);

    this.api.editRestaurant(editedRestaurant)
      .subscribe(() => {
        this.change.emit('restaurant');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

    transformInNumberArray(string: string) {
      return JSON.parse('[' + string + ']');
    }

}
