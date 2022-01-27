import { Component, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Atractie } from '../../shared/atractie.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AtractiiService } from 'src/app/services/atractii.services';

@Component({
  selector: 'app-edit-atractie-modal',
  templateUrl: './edit-atractie-modal.component.html',
  styleUrls: ['./edit-atractie-modal.component.css']
})
export class EditAtractieModalComponent implements OnInit {

  @ViewChild('editAtractieModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editAtractieForm: FormGroup;
  atractieCurenta = new Atractie();

  constructor(public fb: FormBuilder, private api: ApiService,private atractiiService : AtractiiService) { }

  ngOnInit(): void {
  }

  show(id: number): void {
    this.modal.show();
    this.atractiiService.getAtractie(id)
      .subscribe((data: Atractie) => {
        this.atractieCurenta = data;
        this.atractieCurenta.id = id;
        this.initializeFrom(this.atractieCurenta);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(atractieCurenta: Atractie) {
    this.editAtractieForm = this.fb.group({
      denumire: [atractieCurenta.denumire, Validators.required],
      oraDeschidere: [atractieCurenta.oraDeschidere, Validators.required],
      oraInchidere: [atractieCurenta.oraInchidere, Validators.required],
      pret: [atractieCurenta.pret, Validators.required],
      adresa: [atractieCurenta.adresa, Validators.required],
      oras: [atractieCurenta.oras, Validators.required],
      img: [atractieCurenta.listaImagini],
    });
  }

  editAtractie() {

    const editedAtractie = new Atractie({
      id: this.atractieCurenta.id,
      denumire: this.editAtractieForm.value.denumire,
      oraDeschidere: this.editAtractieForm.value.oraDeschidere,
      oraInchidere: this.editAtractieForm.value.oraInchidere,
      pret: this.editAtractieForm.value.pret,
      adresa: this.editAtractieForm.value.adresa,
      oras: this.editAtractieForm.value.oras,
      listaImagini: this.editAtractieForm.value.img
    });

    //console.log(this.editCazareForm.value.listaFacilitati);

    this.atractiiService.editAtractie(editedAtractie)
      .subscribe(() => {
        this.change.emit('atractie');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

}
