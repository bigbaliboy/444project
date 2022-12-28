import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FBsrvService, Invoices, Items, Orders } from '../fbsrv.service';

@Component({
  selector: 'app-employee-invoice',
  templateUrl: './employee-invoice.page.html',
  styleUrls: ['./employee-invoice.page.scss'],
})
export class EmployeeInvoicePage implements OnInit {

  public items!: Observable<Items[]>;
  public item: Items = {} as Items;

  orderQuantity !: number

  searchTerm!: string;

  
  constructor( private dataService: FBsrvService, private alertCtrl: AlertController) { 
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

  newInvoice = {} as Invoices;
  
   isNumber(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
  
    if (str.trim() === '') {
      return false;
    }
  
    return !Number.isNaN(Number(str));
  }
temp!:number
  async makeInvoice(x:Items){
    // this.newOrder.id='0'
    if(!this.isNumber(<string><unknown>this.orderQuantity)){
      const alert = await this.alertCtrl.create({
        header: 'Please enter in correct format',
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              return
          },
          },
        ],
      });
      await alert.present();
    }
    else if(this.orderQuantity>this.chosenItem.Quantity){
      const alert = await this.alertCtrl.create({
        header: 'Quantity exceeds the current quantity: '+this.chosenItem.Quantity,
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              return
          },
          },
        ],
      });
      await alert.present();
    }
    else{

      this.newInvoice.invoiceNumber="IFCS003"
      this.newInvoice.Products=this.chosenItem.Name
      this.newInvoice.Quantity= ''+this.orderQuantity;
      this.newInvoice.totalPrice=''+this.orderQuantity*this.chosenItem.Quantity
      this.temp =this.chosenItem.Quantity-this.orderQuantity
      this.chosenItem.Quantity=this.temp

      this.dataService.addInvoices(this.newInvoice);
      this.dataService.updateItems(this.chosenItem);
      const alert = await this.alertCtrl.create({
        header: 'Invoice Created Successfully!',
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              return
          },
          },
        ],
      });
      await alert.present();
      this.chosenItem={} as Items
      this.orderQuantity=0
    }

    

  }
}