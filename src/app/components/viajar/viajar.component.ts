import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/bd.service';

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
  trip: string;
  tripid: any;

  actualtrip = {
    id: null,
    destination: '',
    hour: '',
    date: '',
    cost: 0,
    driver: null
  };

  Trip = {
    id: null,
    destination: '',
    hour: '',
    date: '',
    cost: 0,
    driver: null
  };
  

  constructor(private api: ViajeService,
              public alertController: AlertController,
              private storage: StorageService,) { }



  ngOnInit() {}

  async ionViewWillEnter(){
    this.getViajes()
    this.fullname = await this.storage.get("fullname")
    this.role = await this.storage.get('role')
    this.trip = await this.storage.get('trip')
    this.tripid = await this.storage.get('tripid')
    console.log(this.fullname,"rol:", this.role);
    
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
    if (
      this.Trip.destination !== '' &&
      this.Trip.hour !== '' &&
      this.Trip.date !== '' &&
      this.Trip.cost !== 0
    ) {
      this.Trip.id = this.cant + 1;
      this.Trip.driver = this.storage.get('username');
      this.api.createViaje(this.Trip).subscribe(
        () => {
          this.tripid = this.Trip.id;
          this.obtenerViajeActual()
          this.presentAlert('Viaje agendado');
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
      cssClass: '',
      header: titulo,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // inscribirViaje() {
  //   this.obtenerViajeActual()

  // }

  obtenerViajeActual() {
    this.tripid=this.storage.get('tripid')
    this.api.getViaje(this.tripid).subscribe(
      (dato)=>{
        this.actualtrip = dato;
            }, (error)=>{
        console.log(error);
      });
  }
}
