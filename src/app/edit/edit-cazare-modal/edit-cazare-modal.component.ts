import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Cazare } from '../../shared/cazare.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Facilitate } from 'src/app/shared/facilitate.model';
import { CazariService } from 'src/app/services/cazari.service';


@Component({
  selector: 'app-edit-cazare-modal',
  templateUrl: './edit-cazare-modal.component.html',
  styleUrls: ['./edit-cazare-modal.component.css']
})
export class EditCazareModalComponent implements OnInit{

  @ViewChild('editCazareModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editCazareForm: FormGroup;
  cazareCurenta = new Cazare();
  facilitati = new FormControl();
  facilities: Facilitate[] = [];
  facilitiesNames: string[] = [];
  facilitiesSelectedOptions: number[] = [];


  constructor(public fb: FormBuilder, private api: ApiService,private cazareService :CazariService) { }

  ngOnInit() {
    this.getToateFacilitatile();
  }

  getToateFacilitatile() {
    this.api.getFacilitati()
      .subscribe((data: Facilitate[]) => {
        this.facilities = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getFacilitate(data[i].id)
            .subscribe((info: Facilitate) => {
              info.id = data[i].id;
              this.facilities.push(info);

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

  listOfFacilities() {
    for (let i = 0; i < this.facilities.length; i++) {
      this.facilitiesNames.push(this.facilities[i].denumire);
    }
  }

  show(id: number): void {
    this.modal.show();
    this.cazareService.getCazare(id.toString())
      .subscribe((data: Cazare) => {
        this.cazareCurenta = data;
        this.cazareCurenta.id = id;
        this.initializeFrom(this.cazareCurenta);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(cazareCurenta: Cazare) {
    this.editCazareForm = this.fb.group({
      nume: [cazareCurenta.nume, Validators.required],
      tipCazare: [cazareCurenta.tipCazare, Validators.required],
      pret: [cazareCurenta.pret, Validators.required],
      adresa: [cazareCurenta.adresa, Validators.required],
      oras: [cazareCurenta.oras, Validators.required],
      listaFacilitati: ['', Validators.required],
    });
  }

  editCazare() {

    const editedCazare = new Cazare({
      id: this.cazareCurenta.id,
      nume: this.editCazareForm.value.nume,
      tipCazare: this.editCazareForm.value.tipCazare,
      pret: this.editCazareForm.value.pret,
      adresa: this.editCazareForm.value.adresa,
      oras: this.editCazareForm.value.oras,
      listaFacilitatiID: this.transformInNumberArray(this.editCazareForm.value.listaFacilitati),
    });

    //console.log(this.editCazareForm.value.listaFacilitati);

    this.cazareService.editCazare(editedCazare)
      .subscribe(() => {
        this.change.emit('cazare');
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
