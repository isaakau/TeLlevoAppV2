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

  Trip = {
    id: null,
    destination: '',
    hour: '',
    date: '',
    cost: '',
  };
  

  constructor(private api: ViajeService,
              public alertController: AlertController,
              private storage: StorageService) { }



  ngOnInit() {}

  async ionViewWillEnter(){
    this.getViajes()
    this.fullname = await this.storage.get("fullname")
    this.role = await this.storage.get('role')
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
    if (
      this.Trip.destination !== '' &&
      this.Trip.hour !== '' &&
      this.Trip.date !== '' &&
      this.Trip.cost !== ''
    ) {
      this.Trip.id = this.cant + 1;
      this.api.createViaje(this.Trip).subscribe(
        () => {
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
      cssClass: 'my-custom-class',
      header: titulo,
      buttons: ['OK'],
    });
    await alert.present();
  }


}
