import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'prfx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
     toggleCollapsed(): void {
       this.collapsed = !this.collapsed;
     }

  constructor() { }

  ngOnInit() {
  }

}
