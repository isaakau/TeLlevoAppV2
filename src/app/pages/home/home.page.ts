import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  active: string;

  constructor(private router: Router,
              private api: ViajeService) {
    this.active = "viajar"
  }

  segmentChanged(event: any){
    let direccion=event.detail.value
    this.router.navigate(['home/'+direccion])
  }

  ngOnInit() {
    this.router.navigate(['home/viajar'])
    
  }

  ionViewWillEnter() {
    this.active = "viajar"
  }
}


