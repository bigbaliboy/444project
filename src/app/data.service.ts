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


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { 
    
  }
     EmployeeObj : Employee[] = [{
      name: 'Fatema',
      jobRole: 'Designer',
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
      jobRole: 'Sales',
      cpr: '992278787',
      mobile: '98978761',
      gender:'Male',
      // dob:'12-04-77',
      email: 'njifhoi@gmail.com',
      pwd: '09998378'

     }
    ]
}