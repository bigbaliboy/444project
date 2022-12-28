import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';
import { CalendarMode } from 'ionic2-calendar/calendar';
import { DataService } from '../data.service';
import { CalModalPage } from './cal-modal/cal-modal.page';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.page.html',
  styleUrls: ['./scheduler.page.scss'],
})
export class SchedulerPage implements OnInit {
  eventSource : any 
  viewTitle!: string;
  
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };



  @ViewChild(CalendarComponent)
  myCal!: CalendarComponent;

  constructor(public navCtrl: NavController, private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController, @Inject(LOCALE_ID) private locale: string, private alertCtrl: AlertController,public dataSrv: DataService) { 
    this.eventSource = [];
  }

  ngOnInit() {
    console.log(this.eventSource)
  }

  next() {
    this.myCal.slideNext();
    console.log(this.eventSource)
  }

  back() {
    this.myCal.slidePrev();
    console.log(this.eventSource)
  }
  
  // Selected date reange and hence title changed
  onViewTitleChanged(title: any) {
    this.viewTitle = title;
  }

  async onEventSelected(event: any) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.shift,
      buttons: ['OK'],
    });
    alert.present();
  }

  // createRandomEvents() {
  //   var events = [];
  //   for (var i = 0; i < 1; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: 'All Day - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true,
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: 'Event - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false,
  //       });
  //     }
  //   }
  //   this.eventSource = events;
  // }

  // removeEvents() {
  //   this.eventSource = [];
  // }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
  
    await modal.present();
  
    modal.onDidDismiss().then((result) => {
      
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        console.log(result.data.event.shift)
        this.eventSource.push(result.data.event);
        console.log(this.eventSource[0])
        this.myCal.loadEvents();
      }
    });
  }

 

}
