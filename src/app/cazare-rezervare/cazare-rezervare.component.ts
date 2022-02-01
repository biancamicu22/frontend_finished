import { Component, OnInit, ViewChild } from '@angular/core';
import { Cazare } from '../shared/cazare.model';
import { ApiService } from '../shared/api.service';
import { CazariService } from '../services/cazari.service';
import { CazareRezervare } from '../shared/cazare-rezervare.model';
import { Router } from '@angular/router';
import { VacantaRezervare } from '../shared/vacantaRezervare.model';

@Component({
  selector: 'app-cazare-rezervare',
  templateUrl: './cazare-rezervare.component.html',
})
export class CazareRezervareComponent implements OnInit {

  constructor(private api: ApiService,private cazareService : CazariService,private router: Router) { }
  cazari = new Array<CazareRezervare>()
  vacantaRezervare = new Array<VacantaRezervare>()
  ngOnInit() {
    this.cazareService.getCazareRezervare().subscribe(res=>
      {
        this.cazari = res;
    })

    this.api.getVacantaRezervare().subscribe(res=>
      {
        this.vacantaRezervare =res;
        console.log(this.vacantaRezervare)
      })
  }
  Rezervare(id:string){
    this.router.navigate(['/cazari-rezervari/'+id]);
  }
}
