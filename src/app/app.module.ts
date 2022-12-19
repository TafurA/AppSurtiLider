// Custom native page transition
import { NativePageTransitions } from "@awesome-cordova-plugins/native-page-transitions/ngx";
import { NgModule } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, NativePageTransitions, HTTP],
  bootstrap: [AppComponent],
})
export class AppModule { }
