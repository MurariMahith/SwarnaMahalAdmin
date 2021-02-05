import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from './../../services/customer-details.service';
import { CustomerDetails } from 'src/app/models/CustomerDetails';
import { Inject } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'prfx-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  newCustomer : CustomerDetails = new CustomerDetails();
  offerStartDate : string;
  offerEndDate : string;

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService,
              @Inject(Router) private router :Router) {     
   }

  ngOnInit() {
  }

  onSubmit()
  {    
    //this.newCustomer.uniqueCode = " ";
    var str = this.newCustomer.dob.slice(6,10)+"-"+this.newCustomer.dob.slice(3,5)+"-"+this.newCustomer.dob.slice(0,2);
    var todayDateTest = new Date();
    var str2Test = todayDateTest.getFullYear()+"-"+this.newCustomer.dob.slice(3,5)+"-"+this.newCustomer.dob.slice(0,2);
    console.log(moment(str2Test).subtract(3, 'days').startOf('day').toString())
    console.log(moment(str2Test).add(3, 'days').startOf('day').toString())
    console.log(new Date(moment(str2Test).subtract(3, 'days').startOf('day').toString()))
    // this.getOfferPeriod(new Date(str))
    // console.log(this.offerStartDate)
    // console.log(this.offerEndDate)
    this.newCustomer.offerStartDate = moment(str2Test).subtract(3, 'days').startOf('day').toString()
    this.newCustomer.offerEndDate = moment(str2Test).add(3, 'days').startOf('day').toString()    
    console.log(this.newCustomer)    
    this.service.createCustomer(this.newCustomer);
    this.router.navigateByUrl('/all')
  }

  // getOfferPeriod(date : Date)
  //   {
  //       console.log(date)
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
