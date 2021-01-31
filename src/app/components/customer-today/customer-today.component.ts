import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CustomerDetailsService } from 'src/app/services/customer-details.service';
import { map } from 'rxjs/operators';
import { FCustomerDetails } from 'src/app/models/FCustomerDetails';
import { CustomerDetails } from 'src/app/models/CustomerDetails';

@Component({
  selector: 'prfx-customer-today',
  templateUrl: './customer-today.component.html',
  styleUrls: ['./customer-today.component.scss']
})
export class CustomerTodayComponent implements OnInit {

  AllCustomers : Array<FCustomerDetails> = [];
  AllCustomersOriginal : Array<FCustomerDetails> = [];
  updateCustomer : CustomerDetails = new CustomerDetails();
  count : number = 0;

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

  generateUniqueCodes()
  {
    this.AllCustomers.forEach(o => {
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
  }

}
