import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { alertController } from '@ionic/core';
import { FBsrvService } from '../fbsrv.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor(public navCtrl: NavController) {}

  ngOnInit() {
  
  }

  goTo(route: string){
    this.navCtrl.navigateForward(route);
  }
}
