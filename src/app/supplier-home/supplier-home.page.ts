import { Component, OnInit } from '@angular/core';
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

  today:any;
  constructor(private dataService: FBsrvService) { 
  const loginID=this.dataService.masterID
  this.today = Date.now();
  }
  ngOnInit() {
  }

}
