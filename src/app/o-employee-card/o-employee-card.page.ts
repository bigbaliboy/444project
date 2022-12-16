import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController, ScrollDetail } from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder,FormControl,FormGroup, FormGroupDirective, Validators } from '@angular/forms';

//modal is addPage
// modal2 is Viewpage

export interface Employee{
  name: string
  jobRole: string
  cpr:string
  mobile:string
  gender:string
  dob:string
  email:string
  pwd: string
  
}



@Component({
  selector: 'app-o-employee-card',
  templateUrl: './o-employee-card.page.html',
  styleUrls: ['./o-employee-card.page.scss'],
})

export class OEmployeeCardPage implements OnInit {
  
  // newName!: ElementRef; 
  test=document.querySelector('#test');
  isModalOpen = false;
  chosenModel : Employee 
  revertName : string 
  revertDOB: string
  revertCPR : string
  revertMobile: string
  revertEmail:string
  revertJobRole:string

  // setOpen() {
  //   this.isModalOpen = isOpen;
  // }

  view(members: Employee){
  
    console.log(members.name)
    //  this.value= true
     this.isModalOpen = true;
     this.chosenModel = members
     this.revertName=this.chosenModel.name
     this.revertCPR=this.chosenModel.cpr
     this.revertMobile=this.chosenModel.mobile
     this.revertEmail=this.chosenModel.email
     this.revertDOB=this.chosenModel.dob
     this.revertJobRole=this.chosenModel.jobRole
    
  }

  close(){
    this.isModalOpen=false

  }
  value : boolean = false
  
  isSubmitted=false

  isEdit:boolean = false;
  isEditForNav:boolean = false;
  isSave:boolean = false;
 

 Edit(){
   this.isEdit=false
   this.isSave=true
 }
 Save(){
   this.isEdit=true
   this.isSave=false
   console.log(this.revertName)

  //  this.test.
   this.chosenModel.name= this.revertName
   this.chosenModel.dob=this.revertDOB
   this.chosenModel.cpr=this.revertCPR
   this.chosenModel.email=this.revertEmail
   this.chosenModel.mobile=this.revertMobile
   this.chosenModel.jobRole=this.revertJobRole
   console.log(this.chosenModel)


   
 }

 Cancel(){
  this.isEdit=true
   this.isSave=false
   this.revertName=this.chosenModel.name
     this.revertCPR=this.chosenModel.cpr
     this.revertMobile=this.chosenModel.mobile
     this.revertEmail=this.chosenModel.email
     this.revertDOB=this.chosenModel.dob
     this.revertJobRole=this.chosenModel.jobRole
 }



  
  ionicForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl(),
    cpr: new FormControl(),
    pwd: new FormControl(),
    confirmPwd: new FormControl(),
    jobRole: new FormControl(),
    gender: new FormControl(),
    dob: new FormControl()
    
    



    // jobRole: new FormControl

 });



  
  //for date
  date =undefined

// for add employee modal
  presentingElement = undefined;
    //for modal add employee
    presentingElement2 = undefined;
  constructor(private actionSheetCtrl: ActionSheetController, private alertController: AlertController, private router:Router, public DataSrv: DataService, public formBuilder: FormBuilder) {
    this.isEdit=true
    this.chosenModel=this.EmployeeList[0]
    this.revertName=""
    this.revertDOB=""
    this.revertMobile=""
    this.revertEmail=""
    this.revertCPR=""
    this.revertJobRole=""

    
    
    this.ionicForm =this.formBuilder.group({
      name: ['', Validators.compose([Validators.required,  Validators.minLength(5), Validators.maxLength(30)])],
      jobRole: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      cpr: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      pwd: ['', Validators.compose([Validators.required,  Validators.minLength(8), Validators.maxLength(30), Validators.pattern('^[0-9]+$')])],
      gender: ['',[Validators.required ]],
      confirmPwd:['',[Validators.required,  ]],
      dob:['',[Validators.required ]]},{
      validators: this.pwd.bind(this)
      
    })

    
   }
   
  
  ngOnInit() {
    // part of mmodal add
    this.presentingElement = document.querySelector('.ion-page') as any;
    // part of mmodal View
    this.presentingElement2 = document.querySelector('.ion-page2') as any;

    
  }

  pwd(formGroup: FormGroup) {
    console.log("working")
    const  password = this.ionicForm.get('pwd');
    const  confirmPassword  = this.ionicForm.get('confirmPwd');
    return password === confirmPassword ? null : { passwordNotMatch: true };

  }
  


  

  EmployeeList=this.DataSrv.EmployeeObj

// Modal page for add
  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
        },
        {
          text: 'No',
          role: 'cancel',
        },
      ],
    });

    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };
  // --------------------------


  async confirmAdd() {
    console.log("hello")

    this.isSubmitted = true;

    console.log('FormGroup Status: ' + this.ionicForm.status)
    // this.isSubmitted = true;
    if (this.ionicForm.valid==false) {
      console.log('aaaaaa')
      const alert = await this.alertController.create({
        header: 'Please provide all the required values!',
        message: '',
        buttons: [
           {
            text: 'Okay',
            handler: () => {
  
                // window.location.reload();
                
            }
          }
        ]
      })

      await alert.present();

      return
      
    } else {
        const alert = await this.alertController.create({
        header: 'Added Succesfully!',
        message: '',
        buttons: [
          // {
          //   text: 'Cancel',
          //   role: 'cancel',
          //   cssClass: 'secondary',
          //   handler: () => {
          //     console.log('Confirm Cancel: blah');
          //   }
          // },
           {
            text: 'Okay',
            handler: () => {
  
                // window.location.reload();
                
            }
          }
        ]
      })


      let newMember ={} as Employee;
      newMember.name=this.ionicForm.value.name
      newMember.jobRole=this.ionicForm.value.jobRole
      newMember.cpr=this.ionicForm.value.cpr
      newMember.mobile=this.ionicForm.value.mobile
      newMember.gender=this.ionicForm.value.gender
      newMember.dob=this.ionicForm.value.dob
      newMember.email=this.ionicForm.value.email
      newMember.pwd=this.ionicForm.value.pwd
  
      this.DataSrv.EmployeeObj.push(newMember)
      this.ionicForm.reset()

      await alert.present();

      // this.name= ''
    // this.jobRole=''
    // this.cpr=''
    // this.mobile=''
    // this.gender=''
    // this.dob=''
    // this.email=''
    // this.pwd=''

    }
    


  }

  submitForm() {
    console.log(this.ionicForm.value)
  }

// END OF ADD PAGE FUNCTIONS
// Modal page for View


    canDismissForView = async () => {
      console.log("fast")

      if (this.isEditForNav==false) {
        return true
       }
       else{
    
        console.log("else")

          const actionSheet = await this.actionSheetCtrl.create({
    header: 'Are you sure?',
    buttons: [
      {
        text: 'Yes',
        role: 'confirm',
      },
      {
        text: 'No',
        role: 'cancel',
      },
    ],
  });

  actionSheet.present();

  const { role } = await actionSheet.onWillDismiss();
  
    return role === 'confirm';
  } 

}


}
// --------------------------



   
