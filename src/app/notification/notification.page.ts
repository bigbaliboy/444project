import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Orders, Invoices, Items, Notifications } from '../fbsrv.service';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
selectTabs = 'stock';

public notifications!: Observable<Notifications[]>;
public notification: Notifications = {} as Notifications;
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
}
