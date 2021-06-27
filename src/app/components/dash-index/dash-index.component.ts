import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-index',
  templateUrl: './dash-index.component.html',
  styleUrls: ['./dash-index.component.css']
})
export class DashIndexComponent implements OnInit {

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
