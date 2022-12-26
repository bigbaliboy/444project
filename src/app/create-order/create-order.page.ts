import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FBsrvService, Employees, Orders, Invoices, Items } from '../fbsrv.service';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.page.html',
  styleUrls: ['./create-order.page.scss'],
})
export class CreateOrderPage implements OnInit {


  public items!: Observable<Items[]>;
  public item: Items = {} as Items;

  orderQuantity !: number

  searchTerm!: string;

  
  constructor(public formBuilder: FormBuilder, private dataService: FBsrvService) { 
    this.items = this.dataService.getItems();
    //  this.newOrder.items = '';
    // this.newOrder.Quantity= 0;
    // this.newOrder.Supplier='';
    
  }

  ngOnInit() {
  }

  presentingElement: any;

  chosenItem!: Items ;

  isSelected = false;

  saveItem(x: Items){
    this.chosenItem=x
    console.log(this.chosenItem);
    this.isSelected = true;
  }


  clearItem(){
    this.chosenItem = {} as Items;
    this.isSelected = false;
  }

  newOrder = {} as Orders;
  
   isNumber(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
  
    if (str.trim() === '') {
      return false;
    }
  
    return !Number.isNaN(Number(str));
  }

  makeOrder(x:Items){
    // this.newOrder.id='0'
    console.log(this.newOrder);
    if(!this.isNumber(<string><unknown>this.orderQuantity)){
      alert("FAAAAAAAAAATTTTTTTTTTTTTT ema")
    }
    this.newOrder.items = x.Name;
    this.newOrder.Quantity= this.orderQuantity;
    this.newOrder.Supplier=x.Supplier;
    this.newOrder.orderNumber='';
    console.log(this.newOrder);
    this.dataService.addOrders(this.newOrder);
    
  }


}


