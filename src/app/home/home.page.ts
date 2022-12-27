import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { FBsrvService } from '../fbsrv.service';
import { AnimationController } from "@ionic/angular"


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



  constructor(public router: Router, public FB: FBsrvService, private animationCtrl: AnimationController) { }
  ngAfterViewInit() {
    this.pulseButton()
  }

  setUType(uName: string) {
    this.userSplit = uName.split('@')
    this.userSplit = this.userSplit[1].split('.')
    this.FB.userType = this.userSplit[0]
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
          this.router.navigateByUrl('/settings');
        else
          this.router.navigateByUrl('/employee-view');
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



