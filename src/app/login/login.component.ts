import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);
  data: string | undefined;
  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
  public confirmAdd(): void {
    // console.log(this.data);
  }
  submit() {
  }
  ngOnInit(): void {
  }

}
