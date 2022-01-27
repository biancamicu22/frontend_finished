import { Component, OnInit, ViewChild } from '@angular/core';
import { Vacanta } from '../../../shared/vacanta.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../shared/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-choose-vacation-modal',
  templateUrl: './choose-vacation-modal.component.html',
  styleUrls: ['./choose-vacation-modal.component.css']
})
export class ChooseVacationModalComponent implements OnInit {

  @ViewChild('chooseVacationModal') modal: ModalDirective;
  vacanteDisponibile: Vacanta[] = [];
  vacantaAleasa: string;
  vacanteForm: FormGroup;

  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.vacanteForm = this.fb.group({
      vacanta: [null]
    });
  }

  show() {
    this.api.getVacante()
      .subscribe((data: Vacanta[]) => {
        this.vacanteDisponibile = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getVacanta(data[i].id)
            .subscribe((info: Vacanta) => {
              info.id = data[i].id;
              this.vacanteDisponibile.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });

    this.modal.show();
  }

  get() {
    return this.vacanteForm.get('vacanta').value;
  }



}
