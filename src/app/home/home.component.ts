import { Component, ViewChild } from '@angular/core';
import { AddVacantaModalComponent } from './add-vacanta-modal/add-vacanta-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @ViewChild('addVacantaModal') addVacanta: AddVacantaModalComponent;

  constructor() { }

  ngOnInit() { }

  //openModal() {
    //this.addVacanta.show();
  //}


}
