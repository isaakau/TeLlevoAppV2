import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {
  @ViewChild('animar',{read: ElementRef, static:true}) animar:ElementRef;
  constructor(private animationCtrl:AnimationController,
              private router: Router) { }

  ngOnInit() {
  }

  //animación
  ngAfterViewInit(){
    const heart = this.animationCtrl.create()
  .addElement(this.animar.nativeElement)
  .duration(1500)
  .iterations(Infinity)
  .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
  .fromTo('opacity', '1', '0.2');

  heart.play()
  }
  
  volver() {
    this.router.navigate(['/home'])
  }



}
