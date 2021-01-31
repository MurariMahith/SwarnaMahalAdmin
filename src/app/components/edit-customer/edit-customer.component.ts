import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';
import { CustomerDetails } from 'src/app/models/CustomerDetails';

@Component({
  selector: 'prfx-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  customerToBeEdited : FCustomerDetails = new FCustomerDetails();
  editClicked : boolean = false;

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService) { }

  ngOnInit() {
    this.service.getCustomersList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(o => {
      this.AllCustomers = o;
      console.log(this.AllCustomers)
    })
  }

  deleteCustomer(key :string)
  {
    console.log("deleting")
    this.service.deleteCustomer(key)
      .then(() => console.log("deleted successfully"))
      .catch(() => console.log("something went wrong"))
  }

  editCustomer(key :string)
  {
    this.customerToBeEdited = this.AllCustomers.find(o => o.key === key);
    this.editClicked = true;
    console.log(this.customerToBeEdited);
    console.log(this.editClicked);
  }

  onSubmit()
  {
    var key2 = this.customerToBeEdited.key;
    delete this.customerToBeEdited.key;
    this.service.updateCustomer(key2,this.customerToBeEdited);
  }

}
