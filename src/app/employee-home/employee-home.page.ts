import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Notifications } from '../fbsrv.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.page.html',
  styleUrls: ['./employee-home.page.scss'],
})
export class EmployeeHomePage implements OnInit {
  public employees!: Observable<Employees[]>;
  public employee: Employees = {} as Employees;
  

  public notifications!: Observable<Notifications[]>;
  public notification: Notifications = {} as Notifications;

  name!:string
  
  today:any;
  constructor(public dataService: FBsrvService) { 
    this.initName()
  // const loginID=this.dataService.masterID
  this.today = Date.now();

  }

  initName(){
    this.name=this.dataService.loggedUser.name

  }
  ngOnInit() {
    

  }

}
