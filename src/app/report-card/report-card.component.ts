import { Component, Input, OnInit } from '@angular/core';
import {Patrouille} from '../../types/patrouille'

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {

  constructor() { }
  @Input()  
  patrouille: Patrouille = {
    date: undefined,
    id: "",
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
