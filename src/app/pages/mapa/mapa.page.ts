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
      zoom: 16,
      latitude: -33.042418,
      longitude: -71.436925 
    });
 
    CapacitorGoogleMaps.addListener('onMapReady', async () => {
      CapacitorGoogleMaps.setMapType({
        type: "normal" 
      });
      
      this.showCurrentPosition();
    });
  }
 
  async showCurrentPosition() {
    Geolocation.requestPermissions().then(async premission => {
      const coordinates = await Geolocation.getCurrentPosition();
        // Create our current location marker
        CapacitorGoogleMaps.addMarker({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
          title: 'My castle of loneliness',
          snippet: 'Come and find me!'
        });
              // Focus the camera
        CapacitorGoogleMaps.setCamera({
          latitude: coordinates.coords.latitude,
          longitude: coordinates.coords.longitude,
          zoom: 16,
          bearing: 0
        });
      });
  }

  volver() {
    this.router.navigate(['/home'])
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
