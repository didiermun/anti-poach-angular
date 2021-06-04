import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})
export class DashboardChartsComponent implements OnInit {

  constructor() { }
  saleData = [
    { name: "January", value: 40 },
    { name: "February", value: 29 },
    { name: "March", value: 52 },
    { name: "April", value: 36 },
    { name: "May", value: 38 }
  ]; 

  ngOnInit(): void {
  }

}
