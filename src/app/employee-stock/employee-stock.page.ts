import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { NavController } from '@ionic/angular';

import { FBsrvService, Items, Suppliers } from '../fbsrv.service';
@Component({
  selector: 'app-employee-stock',
  templateUrl: './employee-stock.page.html',
  styleUrls: ['./employee-stock.page.scss'],
})
export class EmployeeStockPage implements OnInit {
  public supplier: Suppliers = {} as Suppliers;
  public suppliers!: Observable<Suppliers[]>;

  public item: Items = {} as Items;
  public items!: Observable<Items[]>;

  searchTerm!: string;
  isModalOpen = false;
  chosenModel: Items;

  Name!:string;
  Demand!: string;
  Category!: string;
  Price!: number;
  Quantity!: number;
  Supplier!: string;
  Threshold!: number;

  // If clicked on an Supplier
  view(members: Items) {
    this.isModalOpen = true;
    this.chosenModel = members;


    this.Name = this.chosenModel.Name
    this.Demand = this.chosenModel.Demand
    this.Category = this.chosenModel.Category
    this.Price = this.chosenModel.Price
    this.Quantity = this.chosenModel.Quantity
    this.Supplier = this.chosenModel.Supplier
    this.Threshold = this.chosenModel.thresholdQuantity


  }

  constructor(
    private dataService: FBsrvService,
    private navCtrl: NavController
  ) {
    this.chosenModel = {} as Items;
  }
  ngOnInit() {
    // part of modal add
    this.items = this.dataService.getItems();
    this.suppliers = this.dataService.getSuppliers();
  }

  close() {
    this.isModalOpen = false;
  }

  previous() {
    this.navCtrl.back();
  }
}

// --------------------------
