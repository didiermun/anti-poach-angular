import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoggedinService,Logged} from '../../services/loggedin/loggedin.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  isloggedIn: boolean = false;
  level: string = "";
  isAdmin: boolean = false;
  user_status: Logged = {loggedin: false,code_level: "USER"};
  subscription: any;
  logout(){
    localStorage.removeItem('apr_token');
    localStorage.removeItem('code_level');
    this.logged.setLogged(false, "");
    console.log(this.router.url);
    if(this.router.url.startsWith('/admin') || this.router.url.startsWith('/new-report')){
      this.router.navigateByUrl("/")
    } 
  }

  constructor(private router: Router,private logged: LoggedinService) { }

  ngOnInit(): void {
    this.subscription = this.logged.getLogged().subscribe(
      res => {
        this.isloggedIn = res.loggedin;
        this.level = res.code_level;
        this.isAdmin = this.level==="ADMIN";
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
