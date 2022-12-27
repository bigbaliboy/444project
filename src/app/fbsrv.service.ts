import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentReference } from '@angular/fire/compat/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


export interface Employees {
  id?: string,
  name: string
}

export interface Orders {
  id?: string,
  Quantity: number,
  items: string,
  Supplier: string,
  orderNumber?: string
}

export interface Invoices {
  id?: string,
  invoiceNumber: string,
  Products: string,
  Quantity: string,
  totalPrice: string
}

export interface Items {
  id?: string,
  Demand: string,
  Category: string,
  Price: number,
  Quantity: number,
  Supplier: string,
  Name: string,
  thresholdQuantity: number
}

export interface Favorites {
  id?: string,
  orderSupplier: string,
  orderQuantity: number
  orderItems: string
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

  public favoriteItem: Observable<Favorites[]>;
  public favoritesCollection: AngularFirestoreCollection<Favorites>;

  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth, public alertCtrl: AlertController) {
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

    this.favoritesCollection = this.afs.collection<Favorites>('Favorites');
    this.favoriteItem = this.favoritesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  async Msg(header: any, msg: any) {
    let alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  SignOut(): Promise<void> {
    return this.afAuth.signOut();
  }
  SignUp(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(newEmail, newPassword);
  }

  SignIn(newUsername: string, newPassword: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword
      (newUsername, newPassword);
  }


  getEmployees(): Observable<Employees[]> {
    return this.employees;
  }


  // getEmployee(id: string): Observable<Employees | undefined> {
  //   //@ts-ignore
  //   return this.employeeCollection.doc<Employees>(id).valueChanges().pipe(
  //     map(employee => {
  //       if (employee != undefined)
  //         employee.id = id;
  //       return employee
  //     })
  //   );
  // }



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

  getInvoices(): Observable<Invoices[]> {
    return this.invoices;
  }

  addInvoices(invoices: Invoices): Promise<DocumentReference> {
    return this.invoicesCollection.add(invoices);
  }

  addOrders(orders: Orders): Promise<DocumentReference> {
    return this.ordersCollection.add(orders);
  }


  getItems(): Observable<Items[]> {
    return this.items;
  }

  getFavorites(): Observable<Favorites[]> {
    return this.favoriteItem;
  }

  addFavorites(favorites: Favorites): Promise<DocumentReference> {
    return this.favoritesCollection.add(favorites);
  }



}
