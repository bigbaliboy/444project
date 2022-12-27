import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.page.html',
  styleUrls: ['./supplier-profile.page.scss'],
})
export class SupplierProfilePage implements OnInit {
  isEdit:boolean;
  isSave:boolean = false;
  constructor() {
    this.isEdit=true
   }

  ngOnInit() {
  }
  Edit(){
    console.log('hiiiiiiiiiiii');
    this.isEdit=false
    this.isSave=true
  }
  Save(){
    this.isEdit=true
    this.isSave=false
  }

}
