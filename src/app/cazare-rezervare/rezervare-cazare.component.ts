import { Component, OnInit, ViewChild } from '@angular/core';
import { Cazare } from '../shared/cazare.model';
import { ApiService } from '../shared/api.service';
import { CazariService } from '../services/cazari.service';
import { CazareRezervare, RezervareCazare } from '../shared/cazare-rezervare.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rezervare-cazare',
  templateUrl: './rezervare-cazare.component.html',
})
export class RezervareCazareComponent implements OnInit {

  constructor(private api: ApiService,private cazareService : CazariService,private router: Router, private route: ActivatedRoute) { }
  cazari = new Array<CazareRezervare>()
  rezervare = new Array<RezervareCazare>()
  id: string
  ngOnInit() {
     this.route.params.subscribe(res => this.id = res["id"])
     console.log(this.id)
     this.cazareService.getCazareRezervare().subscribe(res=>
        {
          this.cazari = res;
          console.log(this.cazari)
          this.cazari.forEach(x=>{
            if(x.id.toString() == this.id){
              console.log(x.rezervareCazare);
              this.rezervare = x.rezervareCazare;
            } 
          })
          console.log(this.rezervare)
        })
  }
  Return(){
    this.router.navigate(['/cazari-rezervari']);
  }
}
