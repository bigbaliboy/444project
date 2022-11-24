import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { alertController } from '@ionic/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}


  goTo(){
    alert("Fsrt")
  }
}
