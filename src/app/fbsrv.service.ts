import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Employees {
  id?: string
  name: string
  jobRole: string
  cpr:string
  mobile:string
  gender:string
  email:string
  pwd: string
}

export interface Orders {
  id?: string,
  Quantity: string,
  Supplier: string,
  orderNumber: string
}

export interface Notifications{
  id?: string,
  type: string,
  description: string,
  exists : boolean,

  from?: string,
  fromDate?: string,
  fromShift?: string,
  to?: string,
  toDate?: string,
  toShift: string,
  permit?: string,

  currentQty?: number,
  itemID?: string,

  orderID?: string,
  supplierID?: string,

}

export interface ToBeOrdered {
  id?: string,
  itemID: string
}

export interface Invoices {
  id?: string,
  invoiceNumber: string,
  Products: string, 
  Quantity: string,
  totalPrice: string
}

export interface Items{
  id?:string,
  Name: string,
  Demand: string, 
  Category: string,
  Price: number, 
  Quantity: number, 
  Supplier: string, 
  thresholdQuantity: number
  dateAdded: string
}

export interface Suppliers{
  id?:string
  name: string
  website:string
  mobile:string
  email:string
  pwd: string
  itemSup?: {
    itemId: string
    itemName: string,
   
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class FBsrvService {
  public employees: Observable<Employees[]>;
  public employeeCollection: AngularFirestoreCollection<Employees>;

  public suppliers: Observable<Suppliers[]>;
  public supplierCollection: AngularFirestoreCollection<Suppliers>;

  public orders: Observable<Orders[]>;
  public ordersCollection: AngularFirestoreCollection<Orders>;

  public invoices: Observable<Invoices[]>;
  public invoicesCollection: AngularFirestoreCollection<Invoices>;

  public items: Observable<Items[]>;
  public itemsCollection: AngularFirestoreCollection<Items>;

  public notifications: Observable<Notifications[]>;
  public notificationsCollection: AngularFirestoreCollection<Notifications>;

  public tobeordered: Observable<ToBeOrdered[]>;
  public tobeorderedCollection: AngularFirestoreCollection<ToBeOrdered>;

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

    this.supplierCollection = this.afs.collection<Suppliers>('Suppliers');
    this.suppliers = this.supplierCollection.snapshotChanges().pipe(
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

    this.notificationsCollection = this.afs.collection<Notifications>('Notifications');
    this.notifications = this.notificationsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.tobeorderedCollection = this.afs.collection<ToBeOrdered>('ToBeOrdered');
    this.tobeordered = this.tobeorderedCollection.snapshotChanges().pipe(
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
    return this.employeeCollection.doc(employees.id).update({ 
      name: employees.name,
      jobRole: employees.jobRole,
      cpr:employees.cpr,
      mobile:employees.mobile,
      email:employees.email
     });
  }

  deleteEmployee(id?: string): Promise<void> {
    return this.supplierCollection.doc(id).delete();
  }
  
  getNotifications(): Observable<Notifications[]> {
    return this.notifications;
  }

  addNotifications(notifications: Notifications): Promise<DocumentReference> {
    return this.notificationsCollection.add(notifications);
  }

  updateNotifications(notifications: Notifications): Promise<void> {
    return this.notificationsCollection.doc(notifications.id).update({ exists: notifications.exists });
  }

  deleteNotification(id: string): Promise<void> {
    return this.notificationsCollection.doc(id).delete();
  }

  addToBeOrdered(tobeordered: ToBeOrdered): Promise<DocumentReference> {
    return this.tobeorderedCollection.add(tobeordered);
  }


  getSuppliers(): Observable<Suppliers[]> {
    return this.suppliers;
  }


  addSupplier(suppliers: Suppliers): Promise<DocumentReference> {
    return this.supplierCollection.add(suppliers);
  }

  updateSupplier(suppliers: Suppliers): Promise<void> {
    return this.supplierCollection.doc(suppliers.id).update({ 
      name: suppliers.name,
      mobile:suppliers.mobile,
      email:suppliers.email
     });
  }

  deleteSupplier(id?: string): Promise<void> {
    return this.supplierCollection.doc(id).delete();
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

  addItems(items: Items): Promise<DocumentReference> {
    return this.itemsCollection.add(items);
  }

  updateItems(items: Items): Promise<void> {
    return this.itemsCollection.doc(items.id).update({ 
      Name: items.Name,
      Demand: items.Demand, 
      Category: items.Category,
      Price: items.Price, 
      Quantity: items.Quantity, 
      Supplier: items.Supplier, 
      thresholdQuantity: items.thresholdQuantity
    
     });
  }

  deleteItems(id?: string): Promise<void> {
    return this.itemsCollection.doc(id).delete();
  }



}
