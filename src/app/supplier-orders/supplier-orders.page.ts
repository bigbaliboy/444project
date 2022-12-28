import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController } from '@ionic/angular';
import { Observable} from 'rxjs';
import { Supplier } from '../data.service';
import { FBsrvService, Employees, Orders, Invoices, Items, Favorites, Suppliers } from '../fbsrv.service';
@Component({
  selector: 'app-supplier-orders',
  templateUrl: './supplier-orders.page.html',
  styleUrls: ['./supplier-orders.page.scss'],
})
export class SupplierOrdersPage implements OnInit {
  selectTabs = 'orders';
  favIcon = 'star-outline';

  public suppliers!: Observable<Suppliers[]>;
  public supplier: Suppliers = {} as Suppliers;
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

  constructor(public dataService: FBsrvService, private firestore: AngularFirestore, private navCtrl: NavController ) { }

  name!:string;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async ngOnInit() {
    this.employees = this.dataService.getEmployees();
    this.name=this.dataService.loggedSup.name
    this.suppliers = this.dataService.getSuppliers();
    this.orders = this.dataService.getOrders();
    this.invoices = this.dataService.getInvoices();
    this.items = this.dataService.getItems();
    this.favorites = this.dataService.getFavorites();
    let x = this.firestore.collection('Employees', ref=>
    ref.where('gender', '==', 'Male'))
    .get();
    // let y = await lastValueFrom(x);
    // this.employee.cpr = y.size;
  }


  changedOrder: Orders= {} as Orders
saveStatus(order : Orders){
  this.changedOrder=order
  this.dataService.updateOrder(this.changedOrder)
  
}
  

  previous() {
    this.navCtrl.back();
  }

}


