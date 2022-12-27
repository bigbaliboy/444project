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

  loggedUsers:any;

  async ngOnInit() {
    let x = this.firestore
      .collection('Employees', (ref) => ref.where('cpr', '==', 'nwsAJKS94WswgDzexue8'))
      .get();
      let z = this.firestore.collection('Employees', (ref) => ref.where('cpr', '==', 'nwsAJKS94WswgDzexue8') ).doc.toString
    let y = await lastValueFrom(x);
    this.loggedUsers = y.docs.map(doc => doc.data())

  }

  Edit() {
    this.isEdit = false;
    this.isSave = true;

  }
  Save() {
    this.isEdit = true;
    this.isSave = false;
  }
}
