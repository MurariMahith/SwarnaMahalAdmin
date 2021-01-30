import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from './../../services/customer-details.service';
import { CustomerDetails } from 'src/app/models/CustomerDetails';
import {Inject} from '@angular/core';


@Component({
  selector: 'prfx-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  newCustomer : CustomerDetails = new CustomerDetails();

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService) {     
   }

  ngOnInit() {
  }

  onSubmit()
  {
    this.service.createCustomer(this.newCustomer);
    alert("customer successfully added");
    window.location.href="/add";
  }

}
