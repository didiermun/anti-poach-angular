import { Component, OnInit } from '@angular/core';
import {Patrouille} from '../../types/patrouille'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  size: Patrouille = {
    date: new Date,
    id: "didier",
    type: "",
    sector: 0,
    family: "",
    path: "",
    composition: "",
    nTeamMembers: 6,
    names: [""],
    teamLeader: "",
    gpsNO: 2,
    feuilleNO: 2,
  };
  ngOnInit(): void {
  }

}
