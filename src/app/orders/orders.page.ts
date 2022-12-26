import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Orders, Invoices, Items, Favorites } from '../fbsrv.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  selectTabs = 'orders';
  favIcon = 'star-outline';

  public employees!: Observable<Employees[]>;
  public employee: Employees = {} as Employees;
  public orders!: Observable<Orders[]>;
  public order: Orders = {} as Orders;
  public invoices!: Observable<Invoices[]>;
  public invoice: Invoices = {} as Invoices;
  public items!: Observable<Items[]>;
  public item: Items = {} as Items;
  public favorites!: Observable<Favorites[]>;
  public favorite: Favorites = {} as Favorites;

  constructor(private dataService: FBsrvService) { }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  ngOnInit() {
    this.employees = this.dataService.getEmployees();
    this.orders = this.dataService.getOrders();
    this.invoices = this.dataService.getInvoices();
    this.items = this.dataService.getItems();
    this.favorites = this.dataService.getFavorites();
  }


  newFav = {} as Favorites;

  changeFav(favOrder: Orders){
    this.favIcon = 'star';
    this.newFav.orderItems = favOrder.items;
    this.newFav.orderQuantity = favOrder.Quantity;
    this.newFav.orderSupplier = favOrder.Supplier;
    this.dataService.addFavorites(this.newFav);
  }

}