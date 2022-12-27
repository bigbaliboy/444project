import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Orders, Invoices, Items, Notifications,ToBeOrdered } from '../fbsrv.service';


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
  constructor(private dataService:FBsrvService) { }

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
    if(notif.itemID){
    this.tobeordered.itemID=notif.itemID
    }
    this.dataService.addToBeOrdered(this.tobeordered).then((response) => {
      
      this.tobeordered = {} as ToBeOrdered;

    });
  }

  

}