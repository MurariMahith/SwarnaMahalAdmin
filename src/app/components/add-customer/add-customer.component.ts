import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from 'src/app/models/CustomerDetails';

@Component({
  selector: 'prfx-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  newCustomer : CustomerDetails = new CustomerDetails();

  constructor() {     
   }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log(this.newCustomer)
  }

}
