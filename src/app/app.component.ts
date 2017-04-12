import { Component, OnInit } from '@angular/core';
import { Event } from './models/Event';
import { EventServices } from './event.service';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ EventServices , LoginService ]
})

export class AppComponent implements OnInit{
  title = 'Zenith Society';
  isAuth : boolean;

  constructor(private eventservices: EventServices, private loginservice:LoginService, private router:Router) {}

  isAuthenticated() : boolean {
    let user = localStorage.getItem("access_token");
    if(user)
      this.isAuth = true;
    else
      this.isAuth = false;
    return this.isAuth;
  }

  logout() : void {
    this.loginservice.logout();
    let user = localStorage.getItem("access_token");
    if(!user)
      this.router.navigate(['./login']);
  } 

  ngOnInit() {
    this.router.navigate(['./events']);
  }
  
}
