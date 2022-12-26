import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { OEmployeeCardPageModule } from './o-employee-card/o-employee-card.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Subscriber } from 'rxjs';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

var firebaseConfig = {
  apiKey: "AIzaSyAko6tZ6MqiNvKzox-xsfe5e12iRnMgCRI",
  authDomain: "coldstore-263bf.firebaseapp.com",
  projectId: "coldstore-263bf",
  storageBucket: "coldstore-263bf.appspot.com",
  messagingSenderId: "913035116981",
  appId: "1:913035116981:web:e3bcef3a7a9cfecf2959fc",
  measurementId: "G-X6GG9E8933"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule,

    // initialize angularfire with credentials from the dashboard
    AngularFireModule.initializeApp(firebaseConfig),
    // Import the AngularFireDatabaseModule to use database
    AngularFirestoreModule,
    Ng2SearchPipeModule,
    AngularFireAuthModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {

}

