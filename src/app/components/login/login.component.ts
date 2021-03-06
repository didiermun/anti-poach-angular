import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {LoggedinService} from '../../services/loggedin/loggedin.service';
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
  hide:boolean = true;
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
        localStorage.setItem("apr_token",res.login.token)
        this.logged.setLogged(true, "USER");
        this.router.navigateByUrl("/");
      }
      else{
        this.notifier.notify('error','Code not found');
      }
    },(error) => {
      if(error.networkError){
        this.notifier.notify('error','Internet connection problems detected')
      }else{
      this.notifier.notify('error', `${error.message}`);
    }
    });
  }
  submit() {
  }
  ngOnInit(): void {
  }

}
