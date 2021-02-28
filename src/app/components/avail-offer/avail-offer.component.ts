import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';
import * as moment from 'moment';

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
    // let xyz = moment('1999/05/21').subtract(1, 'days').startOf('day').toString()
    // console.log(moment('1999/02/28').subtract(3, 'days').startOf('day').toString())
    // console.log(moment('1999/02/28').add(3, 'days').startOf('day').toString())
    // console.log("hello")
    // console.log(new Date(xyz))
    // var d = new Date(xyz)
    // console.log(d.getDate())
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
    var accept : boolean = false;
    customerToAvailedOffer = this.AllCustomersOriginal.find(o => o.key === key);

    var todaym = moment()
    if(todaym.isSameOrAfter(customerToAvailedOffer.offerStartDate) && todaym.isSameOrBefore(customerToAvailedOffer.offerEndDate))
    {
      console.log("hai");
      accept = true;
    }
    else
    {
      if(todaym.isAfter(customerToAvailedOffer.offerEndDate))
      {
        var confirm3 = confirm("Offer period for "+customerToAvailedOffer.customerName+" is already completed, do you still want to avail offer for this customer")
        if(confirm3)
          accept = true;
      }
      else
      {
        var confirm2 = confirm("Offer dates for "+customerToAvailedOffer.customerName+" doesn't match for today's date, you can still avail offer but the customer can't reuse that offer again, do you want to continue?")
        if(confirm2)
          accept = true;
      }
    }

    console.log(customerToAvailedOffer)

    var confirmAvailOffer = confirm("Do you want to avail offer for "+customerToAvailedOffer.customerName);
    if(confirmAvailOffer && accept)
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
        customerToAvailedOffer.availStatus.availTime = moment().toString();
        var status = prompt("Please enter status of availed offer, ex: item purchased, customer satisfaction, final discount applied, etc.,.")
        if(status == null || status == '')
        {
          customerToAvailedOffer.availStatus.availItem = '';
        }
        else
        {
          customerToAvailedOffer.availStatus.availItem = status;
        }
        var key2 = customerToAvailedOffer.key;
        delete customerToAvailedOffer.key;
        this.service.updateCustomer(key2,customerToAvailedOffer);
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
    var todaym = moment();
    var accept : boolean = false;
    if(todaym.isSameOrAfter(customerToCancelOffer.offerStartDate) && todaym.isSameOrBefore(customerToCancelOffer.offerEndDate))
    {
      console.log("hai");
      accept = true;
    }
    if(todaym.isAfter(customerToCancelOffer.offerEndDate))
    {
      var confirm3 = confirm("Offer period for "+customerToCancelOffer.customerName+" is already completed even if you cancel availed offer, the customer can't reuse the offer again in this year.");
      if(confirm3)
        accept = true;
    }
    if(todaym.isBefore(customerToCancelOffer.offerStartDate))
    {
      var confirm4 = confirm("Offer period for "+customerToCancelOffer.customerName+" is in future, if you cancel availed offer, the customer can reuse the offer again in this year.");
      if(confirm4)
        accept = true;
    }
    
    if(accept)
    {
      var confirmCancelOffer = confirm("Do you want to cancel availed offer for "+customerToCancelOffer.customerName+", Now the customer can avail offer again.");
      if(confirmCancelOffer)
      {
        customerToCancelOffer.offerUsed = false;
        customerToCancelOffer.availStatus.availItem = '';
        customerToCancelOffer.availStatus.availTime = '';
        var key2 = customerToCancelOffer.key;
        delete customerToCancelOffer.key;
        this.service.updateCustomer(key2,customerToCancelOffer);
        console.log(customerToCancelOffer)
        alert("Offer rolled back for "+customerToCancelOffer.customerName+".");
      }
    }
  }

}
