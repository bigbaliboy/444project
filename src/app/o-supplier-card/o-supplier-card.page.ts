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
import {Employee, Items } from '../data.service';
import { FBsrvService, Suppliers } from '../fbsrv.service';
import { Observable } from 'rxjs/internal/Observable';

// export interface Supplier {
//   id: string;
//   name: string;
//   // jobRole: string;
//   items:string[]
//   website: string;
//   mobile: string;
//   //gender: string;
//   email: string;
//   pwd: string;
// }

@Component({
  selector: 'app-o-supplier-card',
  templateUrl: './o-supplier-card.page.html',
  styleUrls: ['./o-supplier-card.page.scss'],
})
export class OSupplierCardPage implements OnInit {

  public supplier: Suppliers = {} as Suppliers;
  public suppliers!: Observable<Suppliers[]>;
  // test = document.querySelector('#test');
  searchTerm!: string;
  isModalOpen = false;
  chosenModel: Suppliers;
  revertName: string;
  revertwebsite: string;
  revertMobile: string;
  revertEmail: string;

  itemList:string[];

  // If clicked on an Supplier
  view(members: Suppliers) {
    this.isEdit = true;
    this.isSave = false;
    this.isShowError = false;
    this.isModalOpen = true;
    this.chosenModel = members;
    this.revertName = this.chosenModel.name;
    this.revertwebsite = this.chosenModel.website;
    this.revertMobile = this.chosenModel.mobile;
    this.revertEmail = this.chosenModel.email;
    
    this.itemList = []
if(members.itemSup){
  console.log("hello")
    for(let items of members.itemSup)
    {
     this.itemList.push(items.itemName)
    }
  }

    // Form Group for Edit Supplier Details and its Validators
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
      website: new FormControl(this.revertwebsite, [
        Validators.required,
        Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"),
        Validators.minLength(4),
        Validators.maxLength(30),
      ]),
    });
    this.ionicForm2.disable();
  }

  // Closing Add Supplier MODAL
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

//to delete a supplier
  delete(){

    this.supplier=this.chosenModel
    this.dataService.deleteSupplier(this.supplier.id).then(async (response) => {
      console.log(this.supplier)
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
      this.supplier.name = this.ionicForm2.value.name;
      this.supplier.website = this.ionicForm2.value.website;
      this.supplier.mobile = this.ionicForm2.value.mobile;
      this.supplier.email = this.ionicForm2.value.email;
      this.supplier.id=this.chosenModel.id
      this.itemList = []
      if(this.chosenModel.itemSup){
          for(let items of this.chosenModel.itemSup)
          {
           this.itemList.push(items.itemName)
          }
        }
      // this.supplier.itemSup=this.chosenModel.itemSup
      this.dataService.updateSupplier(this.supplier).then(async (response) => {

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
        this.supplier = {} as Suppliers;
        await alert.present();
        this.ionicForm2.disable();
        this.isEdit = true;
        this.isSave = false;
  

      this.revertName = this.chosenModel.name;
      this.revertwebsite = this.chosenModel.website;
      this.revertEmail = this.chosenModel.email;
      this.revertMobile = this.chosenModel.mobile;
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
      // jobRole: { value: this.revertJobRole, disabled: true },
      website: { value: this.revertwebsite, disabled: true },
      mobile: { value: this.revertMobile, disabled: true },
      email: { value: this.revertEmail, disabled: true },
    });
  }
  

  // Form Group of View Member
  ionicForm2 = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl(),
    website: new FormControl(),
    // jobRole: new FormControl(),
  });

  // Form Group of Add Member
  ionicForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    mobile: new FormControl(),
    website: new FormControl(),
    pwd: new FormControl(),
    confirmPwd: new FormControl(),
    //gender: new FormControl(),
  });

  // for add Supplier modal
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
    this.isEdit = true;
    this.chosenModel = this.SupplierList[0];
    this.revertName = '';
    this.revertMobile = '';
    this.revertEmail = '';
    this.revertwebsite = '';
    // this.revertJobRole = '';
    this.itemList = ['']


    // Validators for Add Supplier
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
        website: [
          '',
          [
            Validators.required,
             Validators.pattern("(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?"),
            Validators.minLength(5),
            Validators.maxLength(18),
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
        //gender: ['', [Validators.required]],
        confirmPwd: ['', [Validators.required]],
        email: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        mobile: new FormControl('', [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
      }
      //   {
      //   validators: this.pwd.bind(this)
      // }
    );

    
  }

  ngOnInit() {
    // part of modal add
    this.presentingElement = document.querySelector('.ion-page') as any;
    this.suppliers = this.dataService.getSuppliers();

  }
  // VALIDATION FOR CONFIRM PASSWORD
  // pwd(formGroup: FormGroup) {
  //   console.log("working")
  //   const  password = this.ionicForm.get('pwd');
  //   const  confirmPassword  = this.ionicForm.get('confirmPwd');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };

  // }

  // Calling SupplierObj from DataService
  SupplierList = this.DataSrv.SupplierObj;

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
    let newMember = {} as Suppliers;
    this.isSubmitted = true;

    console.log(this.ionicForm.status)
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

      this.supplier.name = this.ionicForm.value.name;
      this.supplier.website = this.ionicForm.value.website;
      this.supplier.mobile = this.ionicForm.value.mobile;
      this.supplier.email = this.ionicForm.value.email;
      this.supplier.pwd = this.ionicForm.value.pwd;


      this.dataService.addSupplier(this.supplier).then(async (response) => {

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
        this.supplier = {} as Suppliers;
        await alert.present();
      });
    
      // Assigning value to each newMember variable


      // this.DataSrv.SupplierObj.push(newMember);
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