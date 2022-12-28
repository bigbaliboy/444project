import { Component, OnInit } from '@angular/core';
import { FBsrvService } from '../fbsrv.service';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.page.html',
  styleUrls: ['./supplier-profile.page.scss'],
})
export class SupplierProfilePage implements OnInit {
  isEdit:boolean;
  isSave:boolean = false;
  constructor(public dataService:FBsrvService) {
    this.isEdit=true
   }
   name!:string
   email!:string
   mobile!:string
   website!:string

  ngOnInit() {
    this.name=this.dataService.loggedSup.name
    this.email=this.dataService.loggedSup.email
    this.mobile=this.dataService.loggedSup.mobile
    this.website=this.dataService.loggedSup.website




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
