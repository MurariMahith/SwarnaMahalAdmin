// import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
// import { CustomerDetails } from './../../app/models/CustomerDetails';
 
// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerDetailsService {
 
//   private dbPath = '/customers';
 
//   customersRef: AngularFireList<CustomerDetails> = null;
 
//   constructor(private db: AngularFireDatabase) {
//     this.customersRef = db.list(this.dbPath);
//   }
 
//   createCustomer(customer: CustomerDetails): void {
//     this.customersRef.push(customer);
//   }
 
//   updateCustomer(key: string, value: any): Promise<void> {
//     return this.customersRef.update(key, value);
//   }
 
//   deleteCustomer(key: string): Promise<void> {
//     return this.customersRef.remove(key);
//   }
 
//   getCustomersList(): AngularFireList<CustomerDetails> {
//     return this.customersRef;
//   }
 
//   deleteAll(): Promise<void> {
//     return this.customersRef.remove();
//   }
// }