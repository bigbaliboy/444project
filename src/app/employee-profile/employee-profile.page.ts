import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';
import { Employees, FBsrvService } from '../fbsrv.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.page.html',
  styleUrls: ['./employee-profile.page.scss'],
})
export class EmployeeProfilePage implements OnInit {
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
  cpr!:string
  email!:string
  gender!:string
  jobRole!:string
  mobile!:string

  
  ngOnInit() {
    this.name=this.dataService.loggedUser.name
    this.cpr=this.dataService.loggedUser.cpr
    this.email=this.dataService.loggedUser.email
    this.mobile=this.dataService.loggedUser.mobile
    this.jobRole=this.dataService.loggedUser.jobRole
    this.gender=this.dataService.loggedUser.gender

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
