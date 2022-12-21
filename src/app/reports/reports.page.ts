import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { EChartsOption } from 'echarts';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Orders, Invoices, Items } from '../fbsrv.service';




@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})



export class ReportsPage implements OnInit {

  public employees!: Observable<Employees[]>;
  public employee: Employees = {} as Employees;
  public orders!: Observable<Orders[]>;
  public order: Orders = {} as Orders;
  public invoices!: Observable<Invoices[]>;
  public invoice: Invoices = {} as Invoices;
  public items!: Observable<Items[]>;
  public item: Items = {} as Items;

  searchTerm!: string;
  // itemsList = [
  //   {
  //     "name": "Milk",
  //     "department": "Drinks"
  //   },
  //   {
  //     "name": "Bread",
  //     "department": "Food"
  //   }
  // ];

  constructor(private dataService: FBsrvService) {
  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  selectTabs = 'orders';



  ngOnInit() {
    this.employees = this.dataService.getEmployees();
    this.orders = this.dataService.getOrders();
    this.invoices = this.dataService.getInvoices();
    this.items = this.dataService.getItems();

  }


  insert() {
    this.dataService.addEmployee(this.employee).then((response) => {
      alert("Inserted Successfully");
      this.employee = {} as Employees;
    });
  }



}
