import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  ActionSheetController,
  AlertController, NavController
} from '@ionic/angular';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FBsrvService, Items, Suppliers } from '../fbsrv.service';





@Component({
  selector: 'app-o-stock-card',
  templateUrl: './o-stock-card.page.html',
  styleUrls: ['./o-stock-card.page.scss'],
})
export class OStockCardPage implements OnInit {

  public supplier: Suppliers = {} as Suppliers;
  public suppliers!: Observable<Suppliers[]>;

  //check if isModalOpen is needed
  public item: Items = {} as Items;
  public items!: Observable<Items[]>;
//for adding todays date
  today:any;


  searchTerm!: string;
  isModalOpen = false;
  chosenModel: Items;
  revertName: string;
  revertDemand!: string;
  revertCategory!: string;
  revertPrice!: number;
  revertQuantity!: number;
  revertSupplier!: string;
  revertThreshold!: number;



  // If clicked on an Supplier
  view(members: Items) {
    this.isEdit = true;
    this.isSave = false;
    this.isShowError = false;
    this.isModalOpen = true;
    this.chosenModel = members;
    this.revertName = this.chosenModel.Name;
    this.revertDemand = this.chosenModel.Demand;
    this.revertCategory = this.chosenModel.Category;
    this.revertPrice = this.chosenModel.Price;
    this.revertQuantity = this.chosenModel.Quantity;
    this.revertSupplier= this.chosenModel.Supplier;
    this.revertThreshold = this.chosenModel.thresholdQuantity;


    


    // Form Group for Edit Supplier Details and its Validators
    this.ionicForm2 = new FormGroup({
      Name: new FormControl(
        this.revertName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ])
      ),
      Demand: new FormControl(this.revertDemand, [
        Validators.required,
      ]),
      Category: new FormControl(this.revertCategory, [
        Validators.required,
      ]),
      Price: new FormControl(this.revertPrice, [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
      ]),
      Quantity: new FormControl(this.revertQuantity, [
        Validators.required,
        Validators.pattern('^[0-9]*[1-9][0-9]*$')
      ]),
      Supplier: new FormControl(this.revertSupplier, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      thresholdQuantity: new FormControl(this.revertThreshold, [
        Validators.required,
        Validators.pattern('^[0-9]*[1-9][0-9]*$')
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

    this.item=this.chosenModel
    this.dataService.deleteItems(this.item.id).then(async (response) => {
      console.log(this.item)
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
      this.item.Name = this.ionicForm2.value.Name;
      this.item.Demand = this.ionicForm2.value.Demand;
      this.item.Category = this.ionicForm2.value.Category;
      this.item.Price = this.ionicForm2.value.Price;
      this.item.Quantity = this.ionicForm2.value.Quantity;
      this.item.Supplier = this.ionicForm2.value.Supplier;
      this.item.thresholdQuantity = this.ionicForm2.value.thresholdQuantity;
      this.item.dateAdded= <string> <unknown>Date.now();

      this.item.id=this.chosenModel.id

      // this.supplier.itemSup=this.chosenModel.itemSup
      this.dataService.updateItems(this.item).then(async (response) => {

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
        this.item = {} as Items;
        await alert.present();
        this.ionicForm2.disable();
        this.isEdit = true;
        this.isSave = false;
  

        this.revertName = this.chosenModel.Name;
        this.revertDemand = this.chosenModel.Demand;
        this.revertCategory = this.chosenModel.Category;
        this.revertPrice = this.chosenModel.Price;
        this.revertQuantity = this.chosenModel.Quantity;
        this.revertSupplier= this.chosenModel.Supplier;
        this.revertThreshold = this.chosenModel.thresholdQuantity;
    });
    }
  }

  //  Function of Cancel Button in View Member MODAL 
  cancel() {
    this.isEdit = true;
    this.isSave = false;
    this.isShowError = false;
    this.ionicForm2.reset({
      Name: { value: this.revertName, disabled: true },
      Demand: { value: this.revertDemand, disabled: true },
      Category: { value: this.revertCategory, disabled: true },
      Price: { value: this.revertPrice, disabled: true },
      Quantity: { value: this.revertQuantity, disabled: true },
      Supplier: { value: this.revertSupplier, disabled: true },
      thresholdQuantity: { value: this.revertThreshold, disabled: true },

    });
  }
  

  // Form Group of View Member
  ionicForm2 = new FormGroup({
    Name: new FormControl(),
    Demand: new FormControl(),
    Category: new FormControl(),
    Price: new FormControl(),
    Quantity: new FormControl(),
    Supplier: new FormControl(), 
    thresholdQuantity: new FormControl(),
    // dateAdded: new FormControl()
  });

  // Form Group of Add Member
  ionicForm = new FormGroup({
    Name: new FormControl(),
    Demand: new FormControl(),
    Category: new FormControl(),
    Price: new FormControl(),
    Quantity: new FormControl(),
    Supplier: new FormControl(), 
    thresholdQuantity: new FormControl(),
    dateAdded: new FormControl()
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
    this.chosenModel = {} as Items
    this.revertName = "";
    this.revertDemand = "";
    this.revertCategory = ''
    this.revertPrice = 0.0
    this.revertQuantity = 0
    this.revertSupplier= ""
    this.revertThreshold = 0


    // Validators for Add Supplier
    this.ionicForm = new FormGroup({
      Name: new FormControl(
        this.revertName,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ])
      ),
      Demand: new FormControl(this.revertDemand, [
        Validators.required,
      ]),
      Category: new FormControl(this.revertCategory, [
        Validators.required,
      ]),
      Price: new FormControl(this.revertPrice, [
        Validators.required,
        Validators.pattern('^[0-9]+(\.[0-9]{1,3})?$')
                            
      ]),
      Quantity: new FormControl(this.revertQuantity, [
        Validators.required,
        Validators.pattern('^[0-9]*[1-9][0-9]*$')
      ]),
      Supplier: new FormControl(this.revertSupplier, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      thresholdQuantity: new FormControl(this.revertThreshold, [
        Validators.required,
        Validators.pattern('^[0-9]*[1-9][0-9]*$')
      ]),
      dateAdded: new FormControl(this.revertThreshold, [
        Validators.required,
      ]),
    });
    
  }

  ngOnInit() {
    // part of modal add
    this.presentingElement = document.querySelector('.ion-page') as any;
    this.items = this.dataService.getItems();
    this.suppliers = this.dataService.getSuppliers();
    this.ionicForm.reset();


  }
  // VALIDATION FOR CONFIRM PASSWORD
  // pwd(formGroup: FormGroup) {
  //   console.log("working")
  //   const  password = this.ionicForm.get('pwd');
  //   const  confirmPassword  = this.ionicForm.get('confirmPwd');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };

  // }

  // Calling SupplierObj from DataService

  // ItemsList = this.DataSrv.itemObj;

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
    let newMember = {} as Items;
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

      this.item.Name = this.ionicForm.value.Name;
      this.item.Demand = this.ionicForm.value.Demand;
      this.item.Category = this.ionicForm.value.Category;
      this.item.Price = this.ionicForm.value.Price;
      this.item.Quantity = this.ionicForm.value.Quantity;
      this.item.Supplier = this.ionicForm.value.Supplier;
      this.item.thresholdQuantity = this.ionicForm.value.thresholdQuantity;
      this.item.dateAdded= <string> <unknown>Date.now();

      this.dataService.addItems(this.item).then(async (response) => {

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
        this.item = {} as Items;
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


