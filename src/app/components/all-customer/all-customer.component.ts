import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';

@Component({
  selector: 'prfx-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.scss']
})
export class AllCustomerComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  AllCustomersOriginal : Array<FCustomerDetails> = [];

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
      this.AllCustomersOriginal = o;
      console.log(this.AllCustomers)
    })
  }

  sortLocalCustomers()
  {
    this.AllCustomers = this.AllCustomers.filter(o => o.isLocalCustomer === true);
    document.getElementById("local").classList.add("disabled");
  }
  sortWhatsappCustomers()
  {
    this.AllCustomers = this.AllCustomers.filter(o => o.usingWhatsapp === true);
    document.getElementById("whatsapp").classList.add("disabled");
  }
  sortOldCustomers()
  {
    this.AllCustomers = this.AllCustomers.filter(o => o.isOldCustomer === true);
    document.getElementById("old").classList.add("disabled");
  }
  reset()
  {
    this.AllCustomers = this.AllCustomersOriginal;
    document.getElementById("local").classList.remove("disabled");
    document.getElementById("whatsapp").classList.remove("disabled");
    document.getElementById("old").classList.remove("disabled");
  }
  offerUsed(key :string)
  {
    //here we update user as he used his offer and he is not eligible for this offer again in this year
    var customerToAvailedOffer = new FCustomerDetails();
    customerToAvailedOffer = this.AllCustomersOriginal.find(o => o.key === key);

    var xyz = confirm("Do you want to avail offer for "+customerToAvailedOffer.customerName);
    if(xyz)
    {
      var person = prompt("Please enter unique code given to customer");
      if (person == null || person == "") 
      {
        alert("unique code empty or not given")
      } 
      else if(person == customerToAvailedOffer.uniqueCode)
      {
        alert("You are availing offer for "+customerToAvailedOffer.customerName)
        customerToAvailedOffer.offerUsed = true;
        console.log(customerToAvailedOffer)
      }
      else 
      {
        alert("unique code not matched with "+customerToAvailedOffer.customerName+" please try again")
      }
      //alert("You are availing offer for "+customerToAvailedOffer.customerName)
      // customerToAvailedOffer.offerUsed = true;
      // console.log(customerToAvailedOffer)
    }
  }

}
