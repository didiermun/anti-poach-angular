import { Component, OnInit } from '@angular/core';
import {LoggedinService} from '../services/loggedin/loggedin.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  isloggedIn: boolean = false;
  subscription: any;
  logout(){
    localStorage.removeItem('token');
    this.logged.setLogged(true, false);
    // this.router.navigateByUrl("")
  }

  constructor(private logged: LoggedinService) { }

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
