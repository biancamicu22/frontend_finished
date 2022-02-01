import { Component, OnInit, ViewChild } from '@angular/core';
import { Cazare } from '../shared/cazare.model';
import { ApiService } from '../shared/api.service';
import { CazariService } from '../services/cazari.service';
import { CazareRezervare } from '../shared/cazare-rezervare.model';
import { Router } from '@angular/router';
import { VacantaRezervare } from '../shared/vacantaRezervare.model';
import { Bilet } from '../shared/bilet.model';
import { BiletService } from '../services/bilete.services';

@Component({
  selector: 'app-cazare-rezervare',
  templateUrl: './cazare-rezervare.component.html',
})
export class CazareRezervareComponent implements OnInit {

  constructor(private api: ApiService,private cazareService : CazariService,private biletService : BiletService, private router: Router) { }
  cazari = new Array<CazareRezervare>()
  vacantaRezervare = new Array<VacantaRezervare>()
  bilete = new Array<Bilet>()

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

      this.biletService.getTicketsBetweenRangeDate().subscribe(res =>
        {
          this.bilete = res;
        })
  }
  Rezervare(id:string){
    this.router.navigate(['/cazari-rezervari/'+id]);
  }
}
