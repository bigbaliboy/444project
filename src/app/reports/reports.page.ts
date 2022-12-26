import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';
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

  qt = 0;
  Supplier = "";
  Quantity = this.qt.toString();
  Demand = "";
  Category = "";

  // totalSales = 0;


  constructor(private dataService: FBsrvService) {
  }




  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  selectTabs = 'orders';


  presentingElement: any;

  ngOnInit() {
    this.employees = this.dataService.getEmployees();
    this.orders = this.dataService.getOrders();
    this.invoices = this.dataService.getInvoices();
    this.items = this.dataService.getItems();

    this.presentingElement = document.querySelector('.ion-page');
    // setTotalSales()

  }


  clear() {

    this.Supplier = '';
    this.Quantity = '';
    this.qt = 0;
    this.Demand = '';
    this.Category = '';
  }

  insert() {
    this.dataService.addEmployee(this.employee).then((response) => {
      alert("Inserted Successfully");
      this.employee = {} as Employees;
    });
  }


  testAndClose(){
    this.Quantity = this.qt.toString();
    console.log(this.qt, this.Quantity);
  }
  
  // async setTotalSales(){

  //   for(let invSale of this.invoices)

  //   }
  // }



  pinFormatter(value: number) {
    return `${value}`;
  }


}
