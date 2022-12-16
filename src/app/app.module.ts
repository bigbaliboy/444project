import { NgModule } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { OEmployeeCardPageModule } from './o-employee-card/o-employee-card.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
