import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ApiService } from '../../shared/api.service';
import { LoginService } from '../../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-vacanta-modal',
  templateUrl: './add-vacanta-modal.component.html',
  styleUrls: ['./add-vacanta-modal.component.css']
})
export class AddVacantaModalComponent implements OnInit, OnDestroy {

  @ViewChild('addVacantaModal') modal: ModalDirective;
  AddVacantaForm: FormGroup;
  success: boolean;
  logged: boolean;

  constructor(private fb: FormBuilder, private api: ApiService, private data: LoginService) { }

  ngOnInit() {
    this.AddVacantaForm = this.fb.group({
      denumire: [null, Validators.required],
      dataInceput: [null, Validators.required],
      dataSfarsit: [null, Validators.required],
      oras: [null, Validators.required],
      tara: [null, Validators.required]
    });
    if(localStorage.getItem("userData") != "null"){
      this.logged = true;
    }
  }

  ngOnDestroy() {
  }

  get f() { return this.AddVacantaForm.controls; }

  addNew () {
    this.api.addVacanta(this.AddVacantaForm.value).subscribe(() => {

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
}
