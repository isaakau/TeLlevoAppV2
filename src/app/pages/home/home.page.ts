import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}

  segmentChanged(event: any){
    let direccion=event.detail.value
    this.router.navigate(['home/'+direccion])
  }

  ngOnInit() {
    this.router.navigate(['home/viajar'])
  }
}


