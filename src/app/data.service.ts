import { Injectable } from '@angular/core';

export interface Employee{
  name: string
  jobRole: string
  cpr:string
  mobile:string
  gender:string
  // dob:string
  email:string
  pwd: string
}

export interface Supplier{
  id:string
  name: string
  website:string
  mobile:string
  // gender:string
  // dob:string
  email:string
  pwd: string
  itemSup: {
    itemName: string,
    itemId: string
  }[]
}

export interface Items{
  demand: string
  id: string
  name: string
  price: number
  quantity:number
  thresholdQuantity: number
  supplierID: string
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    
  }
     EmployeeObj : Employee[] = [{
      name: 'Fatema',
      jobRole: 'Deliverer',
      cpr: '012929839',
      mobile: '39838033',
      gender:'Female',
      // dob:'11-11-12',
      email: 'gsibdnwnjn@sjisj.com',
      pwd: '123456789'
     },

     {
      name: 'Osama',
      jobRole: 'Cashier',
      cpr: '91090982',
      mobile: '34568787',
      gender:'Male',
      // dob:'11-11-89',
      email: 'judhud@oo.ocm',
      pwd: 'huyyttr'
     },
     {
      name: 'Aslam',
      jobRole: 'Shop Keeper',
      cpr: '992278787',
      mobile: '98978761',
      gender:'Male',
      // dob:'12-04-77',
      email: 'njifhoi@gmail.com',
      pwd: '09998378'

     }
    ]

    SupplierObj : Supplier[] = [{
      id: '1',
      name: 'Almarai',
      website: 'www.almarai.com',
      mobile: '39838033',
      // gender:'Female',
      // dob:'11-11-12',
      email: 'Almarai@sjisj.com',
      pwd: '123456789',
      itemSup:[{
        itemName: 'Milk',
        itemId: '0',
      },
    {
      itemName: 'Bread',
      itemId: '1',
    }]
     },
     {
      id: '2',
      name: 'Cello World',
      website: 'www.celloworld.com',
      mobile: '34568787',
      // gender:'Male',
      // dob:'11-11-89',
      email: 'cello@oo.ocm',
      pwd: 'huyyttr',
      itemSup:[{
        
          itemName: 'Milk',
          itemId: '0',
      }]
     },
     {
      id: '3',
      name: 'Nivea',
      website: 'www.nivea.com',
      mobile: '98978761',
      // gender:'Male',
      // dob:'12-04-77',
      email: 'nivea@gmail.com',
      pwd: '09998378',    
      itemSup:[{
        itemName: 'Milk',
        itemId: '0',
      },
    {
      itemName: 'Bread',
      itemId: '1',
    }]
    }
    ]

    itemObj : Items[]=[{
      demand:'high',
      id: '0',
      name: 'Milk',
      price: 1.15,
      quantity: 30,
      thresholdQuantity: 10,
      supplierID: '1'

    },
    {
      demand:'high',
      id: '1',
      name: 'Bread',
      price: 0.15,
      quantity: 20,
      thresholdQuantity: 5,
      supplierID: '1'

    },
    {
      demand:'medium',
      id: '2',
      name: 'Juice',
      price: 0.25,
      quantity: 30,
      thresholdQuantity: 15,
      supplierID: '1'
    },
    {
      demand:'low',
      id: '3',
      name: 'Pencil',
      price: 1.00,
      quantity: 40,
      thresholdQuantity: 5,
      supplierID: '2'

    },
    {
      demand:'low',
      id: '4',
      name: 'Calculator',
      price: 12.00,
      quantity: 10,
      thresholdQuantity: 3,
      supplierID: '2'
    },
    {
      demand:'medium',
      id: '5',
      name: 'Face Creme',
      price: 6.00,
      quantity: 15,
      thresholdQuantity: 2, 
      supplierID: '3'
    },]
}