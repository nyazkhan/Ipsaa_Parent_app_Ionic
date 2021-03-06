import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CustomHttpService } from './providers/http/custom-http.service';
import { HttpClientModule } from '@angular/common/http';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { User } from './providers/user';
import { StorageService } from './providers/localStorage';
import { AlertService } from './providers/alertService';
import { Page404Component } from './page404/page404.component';
import { LoggingGuard } from './providers/logging.guard';
import { AuthGuard } from './providers/auth.guard';
import { NetworkService } from './providers/network.service';

@NgModule({
  declarations: [AppComponent, Page404Component],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    User,
    StorageService,
    AlertService,
LoggingGuard,
NetworkService,
AuthGuard,
    CustomHttpService,
    FileTransfer,
    { provide: RouteReuseStrategy,
       useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
