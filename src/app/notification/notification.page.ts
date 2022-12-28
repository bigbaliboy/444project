import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Orders, Invoices, Items, Notifications,ToBeOrdered } from '../fbsrv.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
selectTabs = 'stock';

public notifications!: Observable<Notifications[]>;
public notification: Notifications = {} as Notifications;

public tobeordereds!: Observable<ToBeOrdered[]>;
public tobeordered: ToBeOrdered = {} as ToBeOrdered;
  constructor(private dataService:FBsrvService, private navCtrl: NavController) { }

  ngOnInit() {
    this.notifications = this.dataService.getNotifications();
    
  }


  // insert() {
  //   this.dataService.addNotifications(this.notification).then((response) => {
  //     alert("Inserted Successfully");
  //     this.notification = {} as Notifications;
  //   });
  // }

  remove(notif:Notifications){
    notif.exists=false;
    this.dataService.updateNotifications(notif)
    console.log(notif)
  }

  reject(notif:Notifications){
    notif.exists=false;
    this.dataService.updateNotifications(notif)
  }

  reorder(notif:Notifications){
   // this.reject(notif)
    if(notif.itemName){
    this.tobeordered.itemName=notif.itemName
    }
    this.dataService.addToBeOrdered(this.tobeordered).then((response) => {
      
      this.tobeordered = {} as ToBeOrdered;

    });
  }

  previous() {
    this.navCtrl.back();
  }

  

}