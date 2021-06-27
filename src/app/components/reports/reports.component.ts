import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

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
