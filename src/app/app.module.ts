import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage-angular';
import { AuthGuardService } from './services/auth-guard.service';

// import { EmailComposer } from '@ionic-native/email-composer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule, 
            HttpClientModule, 
            IonicStorageModule.forRoot(),
                      ],
  providers: [AuthGuardService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }, 
    // EmailComposer
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
