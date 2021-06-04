import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   isList!: number;
    isMenu: boolean = false;
    isSearch: boolean = false;
    saleData = [
      { name: "January", value: 40 },
      { name: "February", value: 29 },
      { name: "March", value: 52 },
      { name: "April", value: 36 },
      { name: "May", value: 38 }
    ]; 
  constructor() { }

  ngOnInit(): void {
  }

}
