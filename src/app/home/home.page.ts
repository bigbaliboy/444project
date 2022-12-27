import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FBsrvService } from '../fbsrv.service';
import { AnimationController } from "@ionic/angular"
import { lastValueFrom } from 'rxjs';
import { Employee, Supplier } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild("button", { read: ElementRef, static: true }) button!: ElementRef

  public userName!: string;
  public password!: string;

  private userSplit!: string[];



  constructor(public router: Router, public FB: FBsrvService, private animationCtrl: AnimationController, private firestore: AngularFirestore) { }
  ngAfterViewInit() {
    this.pulseButton()
  }
  log:any
  async setUType(uName: string) {
    this.userSplit = uName.split('@')
    this.userSplit = this.userSplit[1].split('.')
    this.FB.userType = this.userSplit[0]
    if(this.FB.userType=='supplier'){
      let x = this.firestore
      .collection('Suppliers', (ref) => ref.where('email', '==', this.FB.masterEmail))
      .get();
    let y = await lastValueFrom(x);
    this.log = y.docs.map(doc => doc.data())

    this.FB.loggedSup=<Supplier>this.FB.loggedSup
    this.FB.loggedSup.name=this.log[0].name
    this.FB.loggedSup.email=this.log[0].email
    this.FB.loggedSup.website= this.log[0].website
    this.FB.loggedSup.itemSup=this.log[0].itemSup
    this.FB.loggedSup.pwd=this.log[0].pwd
    this.FB.loggedSup.mobile=this.log[0].mobile
    console.log(this.log[0])
    }
    else{
      let x = this.firestore
      .collection('Employees', (ref) => ref.where('email', '==', this.FB.masterEmail))
      .get();
    let y = await lastValueFrom(x);
    this.log = y.docs.map(doc => doc.data())
    console.log(this.log)

    this.FB.loggedUser=<Employee>this.FB.loggedUser
    this.FB.loggedUser.name=this.log[0].name
    this.FB.loggedUser.email=this.log[0].email
    this.FB.loggedUser.pwd=this.log[0].pwd
    this.FB.loggedUser.cpr=this.log[0].cpr
    this.FB.loggedUser.mobile=this.log[0].mobile
    this.FB.loggedUser.jobRole=this.log[0].jobRole
    this.FB.loggedUser.gender=this.log[0].gender
    }



  console.log(this.FB.userType)


  }

  SignIn() {
    this.FB.SignIn(this.userName, this.password)
      .then(() => {
        this.FB.masterEmail=this.userName
        this.setUType(this.userName);
      })
      .then(() => {
        this.FB.Msg("SignIn", "Welcome " + this.userName);
        if (this.FB.userType == "owner")
          this.router.navigateByUrl('/tabs');
        else if (this.FB.userType == "supplier")
          this.router.navigateByUrl('/tabs');
        else
          this.router.navigateByUrl('/employee-home');
      })

      .catch(() => {
        this.FB.Msg("SignIn", "Incorrect username or password");
      });
  }

  ngOnInit() {
  }

  public pulseButton() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.button.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, boxShadow: "0 0 0 0 rgba(238, 221, 180, 0.8)" },
        { offset: 0.7, boxShadow: "0 0 0 20px rgba(44, 103, 255, 0)" },
        { offset: 1, boxShadow: "0 0 0 0 rgba(44, 103, 255, 0)" }
      ]);

    animation.play();
  }
}


function SignIn() {
  throw new Error('Function not implemented.');
}



