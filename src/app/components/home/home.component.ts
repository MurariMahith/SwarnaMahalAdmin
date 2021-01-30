import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prfx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dateToday : string;

  constructor() {
    var date = new Date();    
    this.dateToday = date.getDate() + "/" + date.getMonth()+1 + "/" + date.getFullYear();
   }

  ngOnInit() {
  }

}
