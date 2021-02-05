import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';
import { CustomerDetails } from 'src/app/models/CustomerDetails';
import * as moment from 'moment';

@Component({
  selector: 'prfx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  AllCustomersToday : Array<FCustomerDetails> = [];
  dateToday : string;
  NextThreeDay : string;
  todayCustomersCount : number = 0;

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService) {
    var date = new Date();    
    this.dateToday = date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
    this.NextThreeDay = moment().add(3,'days').format('DD/MM/YYYY');
   }

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
      this.getCustomersWithDobThreeDaysAfter2(this.AllCustomers)
    })
  }

  getCustomersWithDobThreeDaysAfter2(customerList :Array<FCustomerDetails>)
  {
    this.AllCustomersToday.length = 0;
    customerList.forEach(o => {
      console.log(o.offerStartDate === moment().startOf('day').toString())
      if(o.offerStartDate === moment().startOf('day').toString())
      {
        this.AllCustomersToday.push(o);
      }
    });
    this.todayCustomersCount = this.AllCustomersToday.length
    console.log(this.todayCustomersCount)
    console.log(this.AllCustomersToday)
  }

  // getCustomersWithDobThreeDaysAfter(customerList :Array<FCustomerDetails>)
  // {
  //   var date = new Date();
  //   var dd = date.getDate();
  //   var mm = date.getMonth()+1
  //   var dayString;
  //   var monthString;
  //   if (dd < 10) { 
  //     dayString = '0' + dd; 
  //   } 
  //   else
  //     dayString = ""+dd;
  //   if (mm < 10) { 
  //     monthString = '0' + mm; 
  //   } 
  //   else
  //     monthString = ""+mm;
  //   var todayDate = dayString+"/"+monthString+"/"+date.getFullYear();  
  //   console.log(todayDate)
  //   customerList.forEach(o => {
  //     if(o.offerStartDate === todayDate)
  //     {
  //       this.AllCustomersToday.push(o);
  //     }
  //   });
  //   this.todayCustomersCount = this.AllCustomersToday.length
  //   console.log(this.todayCustomersCount)
  //   console.log(this.AllCustomersToday)
  // }

}
