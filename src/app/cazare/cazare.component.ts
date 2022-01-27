import { Component, OnInit, ViewChild } from '@angular/core';
import { Cazare } from '../shared/cazare.model';
import { ApiService } from '../shared/api.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';
import { CazariService } from '../services/cazari.service';

@Component({
  selector: 'app-cazare',
  templateUrl: './cazare.component.html',
  styleUrls: ['./cazare.component.css']
})
export class CazareComponent implements OnInit {

  cazari: Cazare[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailModal') detailModal: DetailModalComponent;


  constructor(private api: ApiService,private cazareService : CazariService) { }

  ngOnInit() {
    this.cazareService.getCazari().subscribe((data: Cazare[]) => {

      for (let i = 0; i < data.length; i++) {
        this.cazareService.getCazare(data[i].id.toString()).subscribe((info: Cazare) => {
          info.id = data[i].id;
          if (!info.setImagini) {
            info.setImagini = 'https://image.freepik.com/free-vector/booking-hotel-online-cartoon-icon-illustration-business-technology-icon-concept_138676-2126.jpg';
          }
        
          this.cazari.push(info);
        },
          (e: Error) => {
            console.log('err', e);
          });
      }
    },
      (er: Error) => {
        console.log('err', er);
      });
  }

  showDM(id: number): void {
    this.detailModal.show(id);
  }
}
