import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Employees {
  id?: string,
  name: string
}

export interface Orders {
  id?: string,
  Quantity: string,
  Supplier: string,
  orderNumber: string
}

export interface Invoices {
  id?: string,
  invoiceNumber: string,
  Products: string, 
  Quantity: string,
  totalPrice: string
}

export interface Items{
  Demand: string, 
  Category: string,
  Price: string, 
  Quantity: string, 
  Supplier: string, 
  Name: string,
  thresholdQuantity: string

}

@Injectable({
  providedIn: 'root'
})
export class FBsrvService {
  public employees: Observable<Employees[]>;
  public employeeCollection: AngularFirestoreCollection<Employees>;

  public orders: Observable<Orders[]>;
  public ordersCollection: AngularFirestoreCollection<Orders>;

  public invoices: Observable<Invoices[]>;
  public invoicesCollection: AngularFirestoreCollection<Invoices>;

  public items: Observable<Items[]>;
  public itemsCollection: AngularFirestoreCollection<Items>;

  constructor(private afs: AngularFirestore) {
    this.employeeCollection = this.afs.collection<Employees>('Employees');
    this.employees = this.employeeCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.ordersCollection = this.afs.collection<Orders>('Orders');
    this.orders = this.ordersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.invoicesCollection = this.afs.collection<Invoices>('Invoices');
    this.invoices = this.invoicesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.itemsCollection = this.afs.collection<Items>('Items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  getEmployees(): Observable<Employees[]> {
    return this.employees;
  }


  addEmployee(employees: Employees): Promise<DocumentReference> {
    return this.employeeCollection.add(employees);
  }

  updateEmployee(employees: Employees): Promise<void> {
    return this.employeeCollection.doc(employees.id).update({ name: employees.name });
  }

  deleteEmployee(id: string): Promise<void> {
    return this.employeeCollection.doc(id).delete();
  }

  getOrders(): Observable<Orders[]> {
    return this.orders;
  }

  getInvoices(): Observable<Invoices[]>{
    return this.invoices;
  }
 
  getItems(): Observable<Items[]>{
    return this.items;
  }



}
