import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {LoggedinService} from '../../services/loggedin/loggedin.service';

@Component({
  selector: 'app-delete-pat',
  templateUrl: './delete-pat.component.html',
  styleUrls: ['./delete-pat.component.css']
})
export class DeletePatrouilleComponent implements OnInit {
  isloggedIn: boolean = false;
  subscription: any;
  constructor(private logged: LoggedinService,public dialogRef: MatDialogRef<DeletePatrouilleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    public confirmAdd(): void {
    }
  ngOnInit(): void {
    this.subscription = this.logged.getLogged().subscribe(
      res => {
        this.isloggedIn = res.value;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

}
