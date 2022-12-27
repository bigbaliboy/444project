import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { Employees, FBsrvService } from '../fbsrv.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  isEdit: boolean;
  isSave: boolean = false;
  
  constructor(
    private firestore: AngularFirestore,
    private dataService: FBsrvService,
    private activatedRoute: ActivatedRoute
  ) {
    this.isEdit = true;
  }

  name!:string
  
  ngOnInit() {
    this.name=this.dataService.loggedUser.name
    
  }



  Edit(){
    
    this.isEdit=false
    this.isSave=true
  }
  Save() {
    this.isEdit = true;
    this.isSave = false;
  }
  
  }
