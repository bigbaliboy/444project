import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Employees, FBsrvService, Suppliers } from '../fbsrv.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  constructor(public alertCtrl: AlertController, public FB:FBsrvService, public router: Router, private navCtrl: NavController) {
  }
  ngOnInit() {
  }
  signOut(){
    this.FB.SignOut()
    this.router.navigateByUrl('/home')
    this.FB.loggedSup={} as Suppliers
    this.FB.loggedUser={} as Employees
    this.FB.masterEmail=''
    this.FB.userType=''

  }

  // async showContacts() {
  //   let alert = await this.alertCtrl.create({
  //     header: 'Contact Information',
  //     subHeader: '',
  //     // cssClass : 'default-alert',
  //     message: `<ion-icon name="call"></ion-icon>
  //               <ion-label>Telephone: +973 33339999</ion-label>
  //               <ion-icon name="mail"></ion-icon>
  //               <ion-label>E-mail: coldstore@gmail.com<ion-label>`,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }


  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  iconName:string = "chevron-down";
  contactShown = false;
  helpShown = false;
  locationShown = false;


  toggleTheme(event: any) {
    console.log('Hello dark mode');
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    }
    else {
      document.body.setAttribute('color-theme', 'light');

    }
  }

  previous() {
    this.navCtrl.back();
  }
}

