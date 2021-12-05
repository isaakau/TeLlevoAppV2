import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ViajeService } from 'src/app/services/viaje.service';
import { StorageService } from 'src/app/services/bd.service';
import { Geolocation } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-viajar',
  templateUrl: './viajar.component.html',
  styleUrls: ['./viajar.component.scss'],
})
export class ViajarComponent{
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

  map = null;
  newPosition: {
    lat: any;
    lng: any;
  };


  lat: any;
  lng: any;
  


  constructor(private api: ViajeService,
              public alertController: AlertController,
              private storage: StorageService) {}

  @ViewChild('map') mapView: ElementRef;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.createMap();
  }


  async ionViewWillEnter(){
    this.getViajes()
    this.fullname = await this.storage.get("fullname")
    this.role = await this.storage.get('role')
    console.log(this.fullname,"rol:", this.role);
    
  }

  createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      zoom: 5
    });
    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: "normal" // hybrid, satellite, terrain
      });
      this.showCurrentPosition();
    });
  }

  // coordenadas de geolocation 
  async showCurrentPosition() {
    // const coordinates = await Geolocation.getCurrentPosition();
    // this.lat = coordinates.coords.latitude;
    // this.lng = coordinates.coords.longitude;
    // console.log('Current position:', coordinates);
    // //this.presentAlert2('Current position: ',coordinates.coords.latitude, coordinates.coords.longitude);
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

  // async presentAlert2(titulo: string, message: any, message2:any) {
  //   const alert = await this.alertController.create({
  //     cssClass: 'my-custom-class',
  //     header: titulo,
  //     message: message +" "+ message2,
  //     buttons: ['OK'],
  //   });
  //   await alert.present();
  // }

  // loadMap(lat: any, lng: any) {
  //   // create a new map by passing HTMLElement
  //   const mapEle: HTMLElement = document.getElementById('map');
  //   // create map
  //   const centrar = lat+', '+lng
  //   this.map = new google.maps.Map(mapEle, {
  //     center: centrar,
  //     zoom: 12,
  //     // disableDefaultUI: true,
  //     zoomControl: true,
  //     mapTypeControl: false,
  //     scaleControl: false,
  //     streetViewControl: false,
  //     rotateControl: false,
  //     fullscreenControl: true,
  //   });
  // }
  //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
  //     // this.renderMarkers();
  //     mapEle.classList.add('show-map');
  //   });
  // }


  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
