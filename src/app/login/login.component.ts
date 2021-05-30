import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoggedinService} from '../services/loggedin/loggedin.service';
import { Router} from '@angular/router';
import { Apollo,gql } from 'apollo-angular';
import { NotifierService } from 'angular-notifier';

const LOGIN = gql`
  mutation login($code: String!) {
    login(code: $code) {
      token
      success
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,private logged: LoggedinService,private router: Router,private apollo: Apollo) {
    this.notifier = notifierService;
  }
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
      console.log(res);
      if(res.login.success){
        this.notifier.notify('success', 'Login successful');
        localStorage.setItem("token",res.login.token)
        this.logged.setLogged(false, true);
        this.router.navigateByUrl("/");
      }
      else{
        this.notifier.notify('error','Code not found');
      }
    },(error) => {
      this.notifier.notify('error', `${error.message}`);
    });
  }
  submit() {
  }
  ngOnInit(): void {
  }

}
