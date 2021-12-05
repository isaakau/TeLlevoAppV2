import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  lat: any;
  lng: any;

  constructor(private router: Router) { }

  @ViewChild('map') mapView: ElementRef;

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.createMap();
  }

    createMap() {
    const boundingRect = this.mapView.nativeElement.getBoundingClientRect() as DOMRect;
    CapacitorGoogleMaps.create({
      width: Math.round(boundingRect.width),
      height: Math.round(boundingRect.height),
      x: Math.round(boundingRect.x),
      y: Math.round(boundingRect.y),
      zoom: 5,
      latitude:-33.044179,
      longitude: -71.438479  
    });
  //   CapacitorGoogleMaps.addListener('onMapReady', async () => {
  //     CapacitorGoogleMaps.setMapType({
  //       type: "normal" // hybrid, satellite, terrain
  //     });
  //     this.showCurrentPosition();
  //   });
  }

  // // coordenadas de geolocation 
  // async showCurrentPosition() {
  //   // const coordinates = await Geolocation.getCurrentPosition();
  //   // this.lat = coordinates.coords.latitude;
  //   // this.lng = coordinates.coords.longitude;
  //   // console.log('Current position:', coordinates);
  //   // //this.presentAlert2('Current position: ',coordinates.coords.latitude, coordinates.coords.longitude);
  // }

  volver() {
    this.router.navigate(['/home'])
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
