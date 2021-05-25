import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    formControl = new FormControl('', [
      Validators.required
      // Validators.email,
    ]);
  
    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Required field' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }
  
    submit() {
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    public confirmAdd(): void {
      console.log(this.data);
    }
  ngOnInit(): void {
  }

}
