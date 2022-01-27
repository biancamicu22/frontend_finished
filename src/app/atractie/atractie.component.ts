import { Component, OnInit, ViewChild } from '@angular/core';
import { Atractie } from '../shared/atractie.model';
import { ApiService } from '../shared/api.service';
import { DetailAtractieModalComponent } from './detail-atractie-modal/detail-atractie-modal.component';
import { AtractiiService } from '../services/atractii.services';

@Component({
  selector: 'app-atractie',
  templateUrl: './atractie.component.html',
  styleUrls: ['./atractie.component.css']
})
export class AtractieComponent implements OnInit {

  atractii: Atractie[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailAtractieModal') detailAtractieModal: DetailAtractieModalComponent;

  constructor(private api: ApiService,private atractiiService : AtractiiService) { }

  ngOnInit() {
    this.atractiiService.getAtractii().subscribe((data: Atractie[]) => {

      for (let i = 0; i < data.length; i++) {
        this.atractiiService.getAtractie(data[i].id).subscribe((info: Atractie) => {
          info.id = data[i].id;
          if (!info.listaImagini) {
            info.listaImagini = 'assets/14219410.jpg';
          }
        
          this.atractii.push(info);
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
    this.detailAtractieModal.show(id);
  }
}
