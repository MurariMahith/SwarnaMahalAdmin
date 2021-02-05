import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';
import { CustomerDetails } from 'src/app/models/CustomerDetails';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'prfx-customer-today',
  templateUrl: './customer-today.component.html',
  styleUrls: ['./customer-today.component.scss']
})
export class CustomerTodayComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  AllCustomersToday : Array<FCustomerDetails> = [];
  updateCustomer : CustomerDetails = new CustomerDetails();
  count : number = 0;
  dateToday : string;
  NextThreeDay : string;
  todayCustomersCount : number = 0;

  constructor(@Inject(CustomerDetailsService) private service :CustomerDetailsService,@Inject(Router) private router :Router) { 
    var date = new Date();    
    //this.dateToday = date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
    this.dateToday = moment().format('DD/MM/YYYY');
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
      // console.log(this.AllCustomers)
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
  //   //we need below line not to duplicate records if not understood contact murari
  //   this.AllCustomersToday.length = 0;
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

  generateUniqueCodes()
  {
    this.AllCustomersToday.forEach(o => {
      console.log(o)
      console.log(o.uniqueCode == "")
      if(o.uniqueCode == "")
      {
        this.count++;        
        var randomNumStr = Math.floor((Math.random() * 10000000) + 1).toString()
        if(randomNumStr.length != 7)
        {
          for (var i=randomNumStr.length;i<7;i++)
          {
            randomNumStr=randomNumStr+'0';
          }
        }
        o.uniqueCode = o.customerName.slice(0,3).toLocaleUpperCase() +randomNumStr+"MUK";
        var key2 = o.key;
        delete o.key;
        this.updateCustomer = o; 
        this.service.updateCustomer(key2,this.updateCustomer);
      }
      
    });
    if(this.count>0)
      alert("unique codes generated for "+this.count+" customers.");
    else
      alert("For all the customers unique codes has already generated");

    this.router.navigateByUrl('/today')
  }

  sendMessages()
  {
    alert("orey mukesh ga, idi malli alochinchi raddam intha varaku ok ga?")
  }

}
