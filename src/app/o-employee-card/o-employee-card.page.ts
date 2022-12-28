import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  AlertController,NavController
} from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FBsrvService,Employees } from '../fbsrv.service';
import { Observable } from 'rxjs';




export interface Employee {
  name: string;
  jobRole: string;
  cpr: string;
  mobile: string;
  gender: string;
  email: string;
  pwd: string;
}

@Component({
  selector: 'app-o-employee-card',
  templateUrl: './o-employee-card.page.html',
  styleUrls: ['./o-employee-card.page.scss'],
})
export class OEmployeeCardPage implements OnInit {



  public employee: Employees = {} as Employees;
  public employees!: Observable<Employees[]>;

  searchTerm!: string;
  test = document.querySelector('#test');
  isModalOpen = false;
  chosenModel: Employees;
  revertName: string;
  revertCPR: string;
  revertMobile: string;
  revertEmail: string;
  revertJobRole: string;

  // If clicked on an employee
  view(members: Employee) {
    this.isEdit = true;
    this.isSave = false;
    this.isShowError = false;
    this.isModalOpen = true;
    this.chosenModel = members;
    this.revertName = this.chosenModel.name;
    this.revertCPR = this.chosenModel.cpr;
    this.revertMobile = this.chosenModel.mobile;
    this.revertEmail = this.chosenModel.email;
    this.revertJobRole = this.chosenModel.jobRole;

    // Form Group for Edit Employee Details and its Validators
    this.ionicForm2 = new FormGroup({
      name: new FormControl(
        this.revertName,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ])
      ),
      email: new FormControl(this.revertEmail, [
        Validators.required,
        Validators.email,
      ]),
      mobile: new FormControl(this.revertMobile, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      cpr: new FormControl(this.revertCPR, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      jobRole: new FormControl(this.revertJobRole, Validators.required),
    });
    this.ionicForm2.disable();
  }

  // Closing Add employee MODAL
  close() {
    this.isModalOpen = false;
  }


  value: boolean = false;
  isSubmitted = false;
  // If the Edit Button is clicked in View Member MODAL
  isEdit: boolean = false;
  // To Show Error After the First Save clicked in View Member MODAL
  isShowError: boolean = false;
  // If the Save Button is clicked in View Member MODAL
  isSave: boolean = false;


  // Function of Edit Button in View Member MODAL
  edit() {
    this.isEdit = false;
    this.isSave = true;
    this.ionicForm2.enable();
  }

  // Fuction of Save Button in View Member MODAL 
  async save() {
    if (this.ionicForm2.valid == false) {
      this.isShowError = true;

      const alert = await this.alertController.create({
        header: 'Values are not valid, please enter in correct format',
        message: '',
        buttons: [
          {
            text: 'Okay',
            // handler: () => {

            // }
          },
        ],
      });

      await alert.present();
    } else {

      this.employee.name = this.ionicForm2.value.name;
      this.employee.jobRole = this.ionicForm2.value.jobRole;
      this.employee.cpr = this.ionicForm2.value.cpr;
      this.employee.mobile = this.ionicForm2.value.mobile;
      this.employee.email = this.ionicForm2.value.email;
      this.employee.id=this.chosenModel.id
      this.dataService.updateEmployee(this.employee).then(async (response) => {

        const alert = await this.alertController.create({
          header: 'Updated Succesfully!',
          message: '',
          buttons: [
           
            {
              text: 'Okay',
              handler: () => {
              },
            },
          ],
        });
        this.employee = {} as Employees;
        await alert.present();
        this.ionicForm2.disable();
        this.isEdit = true;
        this.isSave = false;
  
        this.revertName = this.employee.name;
        this.revertCPR = this.employee.cpr;
        this.revertEmail = this.employee.email;
        this.revertMobile = this.employee.mobile;
        this.revertJobRole = this.employee.jobRole;
      });
    
      

    }
  }

  //  Function of Cancel Button in View Member MODAL 
  cancel() {
    this.isEdit = true;
    this.isSave = false;
    this.isShowError = false;
    this.ionicForm2.reset({
      name: { value: this.revertName, disabled: true },
      jobRole: { value: this.revertJobRole, disabled: true },
      cpr: { value: this.revertCPR, disabled: true },
      mobile: { value: this.revertMobile, disabled: true },
      email: { value: this.revertEmail, disabled: true },
    });
  }

  //delete user
  delete(){
    this.employee=this.chosenModel
    this.dataService.deleteEmployee(this.employee.id).then(async (response) => {
      const alert = await this.alertController.create({
        header: 'Deleted Succesfully!',
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              window.location.reload();

            },
          },
        ],
      });
      await alert.present();



    });

  }

  // Form Group of View Member
  ionicForm2 = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl(),
    cpr: new FormControl(),
    jobRole: new FormControl(),
  });

  // Form Group of Add Member
  ionicForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl(),
    cpr: new FormControl(),
    pwd: new FormControl(),
    confirmPwd: new FormControl(),
    jobRole: new FormControl(),
    gender: new FormControl(),
  });

  // for add employee modal
  presentingElement = undefined;

  // Constructor
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private alertController: AlertController,
    private router: Router,
    public DataSrv: DataService,
    public formBuilder: FormBuilder,
    public formBuilder2: FormBuilder,
    private dataService: FBsrvService,
    private navCtrl: NavController
  ) {
    this.authorization(this.dataService.userType)
    this.isEdit = true;
    this.chosenModel = this.EmployeeList[0];
    this.revertName = '';
    this.revertMobile = '';
    this.revertEmail = '';
    this.revertCPR = '';
    this.revertJobRole = '';

    // Validators for Add Employee
    this.ionicForm = this.formBuilder.group(
      {
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(30),
          ]),
        ],
        jobRole: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        mobile: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.minLength(8),
            Validators.maxLength(8),
          ],
        ],
        cpr: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]+$'),
            Validators.minLength(9),
            Validators.maxLength(9),
          ],
        ],
        pwd: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
            Validators.pattern('^[0-9]+$'),
          ]),
        ],
        gender: ['', [Validators.required]],
        confirmPwd: ['', [Validators.required]],
      }
      //   {
      //   validators: this.pwd.bind(this)
      // }
    );

    
  }

  ngOnInit() {
    // part of modal add
    this.presentingElement = document.querySelector('.ion-page') as any;
    this.employees = this.dataService.getEmployees();
  }


async authorization(check:string){
  console.log(check)
  if(check!='owner'){
    this.router.navigateByUrl('/home')
    const alert = await this.alertController.create({
      header: 'Please Login to get access.',
      message: '',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
        },
        },
      ],
    });
    await alert.present();
  }
}

  // VALIDATION FOR CONFIRM PASSWORD
  // pwd(formGroup: FormGroup) {
  //   console.log("working")
  //   const  password = this.ionicForm.get('pwd');
  //   const  confirmPassword  = this.ionicForm.get('confirmPwd');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };

  // }

  // Calling EmployeeObj from DataService
  EmployeeList = this.DataSrv.EmployeeObj;

  // Modal page for add
  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Are you sure?',
      buttons: [
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.ionicForm.reset();
          },
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

  // fuction to Add emplyee
  async confirmAdd() {
    // let newMember = {} as Employee;
    this.isSubmitted = true;

    if (this.ionicForm.valid == false) {
      const alert = await this.alertController.create({
        header: 'Please provide all the required values!',
        message: '',
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              // window.location.reload();
            },
          },
        ],
      });




      await alert.present();

      return;
    } else {
      this.employee.name = this.ionicForm.value.name;
      this.employee.jobRole = this.ionicForm.value.jobRole;
      this.employee.cpr = this.ionicForm.value.cpr;
      this.employee.mobile = this.ionicForm.value.mobile;
      this.employee.gender = this.ionicForm.value.gender;
      this.employee.email = this.ionicForm.value.email;
      this.employee.pwd = this.ionicForm.value.pwd;
    this.dataService.addEmployee(this.employee).then(async (response) => {

      const alert = await this.alertController.create({
        header: 'Added Succesfully!',
        message: '',
        buttons: [
         
          {
            text: 'Okay',
            handler: () => {
            },
          },
        ],
      });
      this.employee = {} as Employees;
      await alert.present();
    });
  


      // Assigning value to each newMember variable


      // this.DataSrv.EmployeeObj.push(newMember);
      this.ionicForm.reset();


    }
  }

  submitForm() {
    console.log(this.ionicForm.value);
  }

  // END OF ADD PAGE FUNCTIONS
  // Modal page for View

  previous() {
    this.navCtrl.back();
}
}
// --------------------------
