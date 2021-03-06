import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import { gql,Apollo } from 'apollo-angular';
import { NotifierService } from 'angular-notifier';

const NEW_CODE = gql`
  mutation newCode($data: NewCode!) {
    newCode(code: $data) {
      _id
    }
  }
`

const ALL_CODES =  gql`
query codes{
  codes{
    id
    code
    level
  }
}
`

@Component({
  selector: 'app-new-edit',
  templateUrl: './new-edit.component.html',
  styleUrls: ['./new-edit.component.css']
})
export class NewEditComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,private apollo: Apollo,public dialogRef: MatDialogRef<NewEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.notifier = notifierService;
     }

    formControl = new FormControl('', [
      Validators.required
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
    this.apollo.mutate({
      mutation: NEW_CODE,
      variables: {
        data: this.data
      }
    }).subscribe(({ data }) => {
      this.notifier.notify('success','Code added successfully!')
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
      console.error(error);
    });
    }
  ngOnInit(): void {}
}
