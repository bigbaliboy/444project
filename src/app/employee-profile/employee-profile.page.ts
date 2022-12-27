import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {
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
