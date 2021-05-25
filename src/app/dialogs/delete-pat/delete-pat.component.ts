import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

export interface Remark {
  text: string;
}

@Component({
  selector: 'app-delete-pat',
  templateUrl: './delete-pat.component.html',
  styleUrls: ['./delete-pat.component.css']
})
export class DeletePatrouilleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletePatrouilleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
    public confirmAdd(): void {
      console.log(this.data);
    }
  ngOnInit(): void {
  }

}
