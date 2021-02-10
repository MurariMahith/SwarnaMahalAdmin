import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CustomerDetails } from './../../app/models/CustomerDetails';
import { Messages } from './../../app/models/Messages';
 
@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {
 
  private dbPath = '/customers';
  private dbPathMessage = '/messages'
 
  customersRef: AngularFireList<CustomerDetails> = null;
  customersRefMessages: AngularFireList<any> = null;
 
  constructor(private db: AngularFireDatabase) {
    this.customersRef = db.list(this.dbPath);
    this.customersRefMessages = db.list(this.dbPathMessage)
  }
 
  createCustomer(customer: CustomerDetails): void {
    this.customersRef.push(customer);
  }
 
  updateCustomer(key: string, value: any): Promise<void> {
    return this.customersRef.update(key, value);
  }
 
  deleteCustomer(key: string): Promise<void> {
    return this.customersRef.remove(key);
  }
 
  getCustomersList(): AngularFireList<CustomerDetails> {
    return this.customersRef;
  }
 
  deleteAll(): Promise<void> {
    return this.customersRef.remove();
  }

  getMessagesList(): AngularFireList<Messages> {
    return this.customersRefMessages;
  }
  createMessage(message: Messages): void {
    this.customersRefMessages.push(message);
  }

  deleteAllMessages(): Promise<void> {
    return this.customersRefMessages.remove();
  }
}