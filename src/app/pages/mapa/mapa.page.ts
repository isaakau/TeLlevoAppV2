import { Component,ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { CapacitorGoogleMaps } from '@capacitor-community/capacitor-googlemaps-native';
import { getDistance } from 'geolib';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  lat: any;
  lng: any;

  dist: any;

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
          title: 'Mi ubicación'
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


  checkCoordinates = async () => {
    const coordinates = await Geolocation.getCurrentPosition();

    const regionBetween = this.getRegionForCoordinates(
      {
        lat: coordinates.coords.latitude,
        lon: coordinates.coords.longitude,
      },
      {
        lat: -33.033258881658504,
        lon: -71.53316950236727,
      }
    );

    CapacitorGoogleMaps.setCamera({
      latitude: regionBetween.latitude,
      longitude: regionBetween.longitude,
      zoom: 11,
      animate: true,
    });

    CapacitorGoogleMaps.addMarker({
      latitude: -33.033258881658504,
      longitude: -71.53316950236727,
      title: 'DUOC VIÑA DEL MAR',
    });

    const distance = getDistance(
      {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      },
      { latitude: -33.033258881658504, longitude: -71.53316950236727 }
    );

    this.dist = distance;

    // alert(
    //   'La distancia hasta DUOC SEDE VIÑA DEL MAR es: ' +
    //     distance +
    //     ' mts'
    // );
  };

  // Calcula la posición de la cámara entre 2 coordenadas
  getRegionForCoordinates = (coord1, coord2) => {
    let minX;
    let maxX;
    let minY;
    let maxY;
    const points = [];
    points.push({
      latitude: coord1.lat,
      longitude: coord1.lon,
    });
    points.push({
      latitude: coord2.lat,
      longitude: coord2.lon,
    });

    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX) * 1.25;
    const deltaY = (maxY - minY) * 1.25;

    return {
      latitude: midX,
      longitude: midY,
    };
  };

  volver() {
    this.router.navigate(['/home'])
  }

  ionViewDidLeave() {
    CapacitorGoogleMaps.close();
  }
}
