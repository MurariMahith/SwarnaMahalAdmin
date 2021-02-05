import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';
import { CustomerDetails } from 'src/app/models/CustomerDetails';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'prfx-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  customerToBeEdited : FCustomerDetails = new FCustomerDetails();
  editClicked : boolean = false;
  offerStartDate : string;
  offerEndDate : string;

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService,
              @Inject(Router) private router :Router) { }

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
    // console.log("deleting")
    this.service.deleteCustomer(key)
      .then(() => console.log("deleted successfully"))
      .catch(() => console.log("something went wrong"))
  }

  editCustomer(key :string)
  {
    this.customerToBeEdited = this.AllCustomers.find(o => o.key === key);
    this.editClicked = true;
    // console.log(this.customerToBeEdited);
    // console.log(this.editClicked);
  }

  onSubmit()
  {
    var str = this.customerToBeEdited.dob.slice(6,10)+"-"+this.customerToBeEdited.dob.slice(3,5)+"-"+this.customerToBeEdited.dob.slice(0,2);
    var todayDateTest = new Date();
    var str2Test = todayDateTest.getFullYear()+"-"+this.customerToBeEdited.dob.slice(3,5)+"-"+this.customerToBeEdited.dob.slice(0,2);
    //this.getOfferPeriod(new Date(str))
    var key2 = this.customerToBeEdited.key;
    this.customerToBeEdited.offerStartDate = moment(str2Test).subtract(3, 'days').startOf('day').toString();
    this.customerToBeEdited.offerEndDate = moment(str2Test).add(3, 'days').startOf('day').toString() 

    // console.log(this.customerToBeEdited.offerStartDate)
    ////////////this.customerToBeEdited.offerStartDate = this.customerToBeEdited.offerStartDate + this.offerStartDate; 
    // console.log(this.customerToBeEdited.offerStartDate)
    /////////////this.customerToBeEdited.offerStartDate = this.customerToBeEdited.offerStartDate.slice(10,20)
    // console.log(this.customerToBeEdited.offerStartDate)
    // console.log(this.offerEndDate)

    // \\\\\\\\this.customerToBeEdited.offerEndDate = this.customerToBeEdited.offerEndDate + this.offerEndDate; 
    // \\\\\\\\\\this.customerToBeEdited.offerEndDate = this.customerToBeEdited.offerEndDate.slice(10,20)
    //console.log(this.customerToBeEdited.offerStartDate.replace(this.customerToBeEdited.offerStartDate,this.offerStartDate))
    // this.customerToBeEdited.offerStartDate = this.offerStartDate
    // this.customerToBeEdited.offerEndDate = this.offerEndDate;
    delete this.customerToBeEdited.key;
    this.service.updateCustomer(key2,this.customerToBeEdited);
    //this.router.navigateByUrl('/edit')
    window.location.href='/edit'

  }

  // getOfferPeriod(date : Date)
  //   {
  //       // console.log(date)
  //       const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  //       var dateNow = new Date()
  //       var yearNow = dateNow.getFullYear();

  //       //check for max and min dates
  //       var dayFromDate = date.getDate();
  //       var minOfferDate = dayFromDate-3;
  //       var maxOfferDate = dayFromDate+3;
  //       var minOfferMonth = date.getMonth()+1;
  //       var maxOfferMonth = date.getMonth()+1;

  //       var totalDaysInMonth = this.daysInMonth(date.getMonth()+1,yearNow)

  //       if(dayFromDate+3>totalDaysInMonth)
  //       {
  //           maxOfferDate = dayFromDate+3-totalDaysInMonth;
  //           maxOfferMonth = date.getMonth()+2
  //       }
  //       if(dayFromDate-3<=0)
  //       {
  //           minOfferDate = this.daysInMonth(date.getMonth(),yearNow)-(dayFromDate-3);
  //           minOfferMonth = date.getMonth();
  //       }
  //       console.log("offer is valid from "+minOfferDate+"/"+minOfferMonth+"/"+yearNow+" to "+maxOfferDate+"/"+maxOfferMonth+"/"+yearNow);
  //       var minOfferDateStr;
  //       var minOfferMonthStr;
  //       var maxOfferDateStr;
  //       var maxOfferMonthStr;
  //       if(minOfferDate<10)
  //         minOfferDateStr = '0' + minOfferDate;
  //       else
  //         minOfferDateStr = ""+minOfferDate;
  //       if(minOfferMonth<10)
  //         minOfferMonthStr = '0' + minOfferMonth;
  //       else
  //         minOfferMonthStr = ""+minOfferMonth;
  //       if(maxOfferDate<10)
  //         maxOfferDateStr = '0' + maxOfferDate;
  //       else
  //         maxOfferDateStr = ""+maxOfferDate;
  //       if(maxOfferMonth<10)
  //         maxOfferMonthStr = '0' + maxOfferMonth;
  //       else
  //         maxOfferMonthStr = ""+maxOfferMonth;
  //       this.offerStartDate = minOfferDateStr+"/"+minOfferMonthStr+"/"+yearNow;
  //       this.offerEndDate = maxOfferDateStr+"/"+maxOfferMonthStr+"/"+yearNow;
  //   }

  //   daysInMonth (month, year) {
  //     return new Date(year, month, 0).getDate();
  // }

}
