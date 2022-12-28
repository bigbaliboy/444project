import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularDelegate, ModalController } from '@ionic/angular';
import {   CalendarMode } from 'ionic2-calendar/calendar';
import {CalendarComponent} from 'ionic2-calendar'
import { DataService } from 'src/app/data.service';
import { lastValueFrom, Observable } from 'rxjs';
import { Employees, FBsrvService } from 'src/app/fbsrv.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {
  

  public employee: Employees = {} as Employees;
  public employees!: Observable<Employees[]>;
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date()
  };
  viewTitle!: string;

  @ViewChild(CalendarComponent)
  myCal!: CalendarComponent;
  
  event = {
    title: '',
    employeeEmail: '',
    shift: '',
    startTime: null as unknown as Date,
    endTime: '',
    allDay: true,
    id: ''
  };
  selected:Employees={} as Employees
  modalReady = false;

  


  constructor(private modalCtrl: ModalController,public dataSrv: DataService, private dataService: FBsrvService  , private firestore: AngularFirestore  )  {}

  ngOnInit() { 
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
    this.employees = this.dataService.getEmployees();

  }

  next() {
    this.myCal.slideNext();
  }

  back() {
    this.myCal.slidePrev();
  }
log:any
  async save() {
      // console.log(this.selected)
      // this.event.employeeEmail=this.selected.email
      // this.event.title=this.selected.name
      let x = this.firestore
      .collection('Employees', (ref) => ref.where('name', '==', this.event.title))
      .get();
      let y = await lastValueFrom(x);
      this.log = y.docs.map(doc => doc.data())
      this.event.employeeEmail=this.log[0].email
      this.modalCtrl.dismiss({event: this.event})
  }
  setEmail(employee:Employees){
    this.event.employeeEmail=employee.email
    console.log("hello")
  }

  onViewTitleChanged(title: any) {
    this.viewTitle = title;
  }

  onTimeSelected(ev: any ) {
    this.event.startTime = new Date(ev.selectedTime);
  }

  close() {
    this.modalCtrl.dismiss();
  }


  markDisabled = (date: Date) => {
    var current = new Date();
    return date < current;
};
}
