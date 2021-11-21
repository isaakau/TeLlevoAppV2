import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';

import { ViajarComponent } from 'src/app/components/viajar/viajar.component';
import { MiCuentaComponent } from 'src/app/components/mi-cuenta/mi-cuenta.component';
import { HistorialViajesComponent } from 'src/app/components/historial-viajes/historial-viajes.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ViajarComponent, MiCuentaComponent, HistorialViajesComponent]
})
export class HomePageModule {}
