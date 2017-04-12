import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  model : any = {}
  loggingIn : boolean = false;
  isLogged : boolean;

  constructor(private loginService : LoginService, private router : Router) { }

  login(): void {
    this.loginService.login(this.model.username, this.model.password).subscribe(()=>{
      this.loginService.setIsLogged(true)
      if(this.loginService.getIsLogged()) {
        this.router.navigate(['./events']);
      }
    });
    
  }

  ngOnInit() {
  }

}
