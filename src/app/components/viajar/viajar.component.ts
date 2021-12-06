import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/bd.service';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.component.html',
  styleUrls: ['./viajar.component.scss'],
})
export class ViajarComponent implements OnInit {
  Trips:any;
  cant: any;
  role: string;
  fullname: string;
  hoy: any;
  
  Trip = {
    id: null,
    destination: '',
    hour: '',
    date: '',
    cost: 0
  };
  

  constructor(private api: ViajeService,
              public alertController: AlertController,
              private storage: StorageService,) {}



  ngOnInit() {}

  async ionViewWillEnter(){
    this.getViajes()
    this.fullname = await this.storage.get("fullname")
    this.role = await this.storage.get('role')
    this.hoy = formatDate(new Date(), 'yyyy-MM-dd','en')
    console.log(this.hoy);
    
  }

  getViajes(){
    this.api.getViajes().subscribe(
      (dato)=>{
        this.Trips = dato;
        this.cant = this.Trips.length;
            }, (error)=>{
        console.log(error);
      });
  }

  createViaje() {
    if (this.Trip.hour === undefined) {
      this.presentAlert('Seleccione una hora');
      return;
    }
    if (this.Trip.cost > 2000) {
      this.presentAlert('El valor del viaje no puede superar los $2000 pesos por persona');
      return;
    }
    if(this.Trip.date < this.hoy) {
      this.presentAlert('La fecha del viaje no puede ser anterior al día de hoy');
      return;
    }
    if (
      this.Trip.destination !== '' &&
      this.Trip.hour !== '' &&
      this.Trip.date !== '' &&
      this.Trip.cost !== 0
    ) {
      this.Trip.id = this.cant + 1;
      this.api.createViaje(this.Trip).subscribe(
        () => {
          this.Trip.destination="";
          this.Trip.hour="";
          this.Trip.date="";
          this.Trip.cost=null;
          this.presentAlert('Viaje agendado');
          location.reload;
          // this.getViajes();

        },
        (error) => {
          console.log('Error ' + error);
        }
      );
    } else {
      this.presentAlert('Faltan campos por llenar');
    }
  }

  async presentAlert(titulo: string) {
    const alert = await this.alertController.create({
      cssClass: 'font-monR',
      header: titulo,
      buttons: ['OK'],
    });
    await alert.present();
  }

}
