import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Notifications } from '../fbsrv.service';
import { Firestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

  
  public employees!: Observable<Employees[]>;
  public employee: Employees = {} as Employees;

  public notifications!: Observable<Notifications[]>;
  public notification: Notifications = {} as Notifications;

  today:any;
  name!:string

  

  constructor(private dataService: FBsrvService) {
    // const loginID=this.dataService.masterID
    this.today = Date.now();

  //   this.firestore.collection('Employees', ref => 
  // ref.where('jobRole', '==', 'Cashier'))
  // }
  }

  ngOnInit() {
    this.name=this.dataService.loggedUser.name

  }}

  