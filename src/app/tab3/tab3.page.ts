import { Component } from '@angular/core';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
   isEdit:boolean;
   isSave:boolean = false;
  constructor() {
    this.isEdit=true
  }

  Edit(){
    this.isEdit=false
    this.isSave=true
  }
  Save(){
    this.isEdit=true
    this.isSave=false
  }
  
}
