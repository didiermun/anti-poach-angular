import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { gql,Apollo } from 'apollo-angular';

const NEW_RECORD = gql`
  mutation newRecord($data: NewRecord!) {
    newRecord(record: $data) {
      id
    }
  }
`

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css']
})
export class NewRecordComponent implements OnInit {

  constructor(private apollo: Apollo,public dialogRef: MatDialogRef<NewRecordComponent>,
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
    visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  remarks: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our remark
    if (value) {
      this.remarks.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(remark: string): void {
    const index = this.remarks.indexOf(remark);

    if (index >= 0) {
      this.remarks.splice(index, 1);
    }
  }
  
    submit() {
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    public confirmAdd(): void {
    let data = {...this.data,remarks:this.remarks};
    data.wpt = Math.round(data.wpt);
    data.number = Math.round(data.number)
    this.apollo.mutate({
      mutation: NEW_RECORD,
      variables: {
        data: data
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
      console.error(error);
    });
    }
  ngOnInit(): void {
  }

}
