import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialViajesComponent } from 'src/app/components/historial-viajes/historial-viajes.component';
import { MiCuentaComponent } from 'src/app/components/mi-cuenta/mi-cuenta.component';
import { ViajarComponent } from 'src/app/components/viajar/viajar.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'micuenta',
        component: MiCuentaComponent
      },
      {
        path: 'viajar',
        component: ViajarComponent
      },
      {
        path: 'misviajes',
        component: HistorialViajesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
