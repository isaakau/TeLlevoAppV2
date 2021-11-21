import { Component, OnInit } from '@angular/core';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.component.html',
  styleUrls: ['./viajar.component.scss'],
})
export class ViajarComponent implements OnInit {
  Trips:any;
  constructor(private api: ViajeService) { }

  ngOnInit() {}

  ionViewWillEnter(){
    this.getViajes()
  }

  getViajes(){
    this.api.getViajes().subscribe(
      (dato)=>{
        console.log('Lista viajes');
        console.log(dato);

        this.Trips=dato;
      }, (error)=>{
        console.log(error);
      });
  }
}
