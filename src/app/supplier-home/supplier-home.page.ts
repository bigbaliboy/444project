import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Notifications } from '../fbsrv.service';

@Component({
  selector: 'app-supplier-home',
  templateUrl: './supplier-home.page.html',
  styleUrls: ['./supplier-home.page.scss'],
})
export class SupplierHomePage implements OnInit {
  public employees!: Observable<Employees[]>;
  public employee: Employees = {} as Employees;

  public notifications!: Observable<Notifications[]>;
  public notification: Notifications = {} as Notifications;
  name!:string

  today:any;
  constructor(public dataService: FBsrvService, private router: Router, private alertController: AlertController) { 
  // this.authorization(this.dataService.userType)
  this.initName()
  this.today = Date.now();
  }

  

  initName(){
    this.name=this.dataService.loggedSup.name

  }

  ngOnInit() {
  }
  async authorization(check:string){
    if(check!='supplier'){
      this.router.navigateByUrl('/home')
      const alert = await this.alertController.create({
        header: 'Please Login to get access.',
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
          },
          },
        ],
      });
      await alert.present();
    }
  }

}
