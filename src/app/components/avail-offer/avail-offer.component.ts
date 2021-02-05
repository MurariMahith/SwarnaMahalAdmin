import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';

@Component({
  selector: 'prfx-avail-offer',
  templateUrl: './avail-offer.component.html',
  styleUrls: ['./avail-offer.component.css']
})
export class AvailOfferComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  AllCustomersOriginal : Array<FCustomerDetails> = [];
  yetToAvailOffer : boolean = false;

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

  sortCustomersYetToAvailOffer()
  {
    this.AllCustomers = this.AllCustomers.filter(o => o.offerUsed === false);
    this.yetToAvailOffer = true;
    document.getElementById("availed").classList.add("disabled");
  }
  reset()
  {
    this.AllCustomers = this.AllCustomersOriginal;
    this.yetToAvailOffer = false;
    document.getElementById("availed").classList.remove("disabled");
  }

  offerUsed(key :string)
  {
    //here we update user as he used his offer and he is not eligible for this offer again in this year
    var customerToAvailedOffer = new FCustomerDetails();
    customerToAvailedOffer = this.AllCustomersOriginal.find(o => o.key === key);

    var confirmAvailOffer = confirm("Do you want to avail offer for "+customerToAvailedOffer.customerName);
    if(confirmAvailOffer)
    {
      var uniqueCodeGivenByAdmin = prompt("Please enter unique code given to customer");
      if (uniqueCodeGivenByAdmin == null || uniqueCodeGivenByAdmin == "") 
      {
        alert("unique code empty or not given")
      } 
      else if(uniqueCodeGivenByAdmin == customerToAvailedOffer.uniqueCode)
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

  offerCancel(key :string)
  {
    //here we update user as he used his offer and he is not eligible for this offer again in this year
    var customerToCancelOffer = new FCustomerDetails();
    customerToCancelOffer = this.AllCustomersOriginal.find(o => o.key === key);

    var confirmCancelOffer = confirm("Do you want to cancel availed offer for "+customerToCancelOffer.customerName+", Now the cistomer can avail offer again.");
    if(confirmCancelOffer)
    {
      alert("Offer rolled back for "+customerToCancelOffer.customerName+".");
    }
  }

}
