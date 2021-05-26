import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router} from '@angular/router';
import { Apollo,gql } from 'apollo-angular';

const LOGIN = gql`
  mutation login($code: String!) {
    login(code: $code) {
      token
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private apollo: Apollo) { }
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
    this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        code: this.data
      }
    }).subscribe(({ data }) => {
      let res: any = data;
      localStorage.setItem("token",res.login.token)
      this.router.navigateByUrl("/");
    },(error) => {
      console.log(this.data,'there was an error sending the query', error);
    });
  }
  submit() {
  }
  ngOnInit(): void {
  }

}
