import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class LoginService {
    constructor(private http: Http) {}

    private BASE_URL:string = "http://localhost:5000/connect/token";
    private token: string = "";

    public isLogged : boolean = false;

    private handleErrors(error : any) {
        console.error('An error has occured.', error);
    }

    getIsLogged() : boolean {
        return this.isLogged;
    }

    setIsLogged(isLogged : boolean) : void {
        this.isLogged = isLogged;
    } 

    logout() : void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
        this.setIsLogged(false);
    }

    login(username:string, password:string) {
        let credentials = 'username='+username+'&password='+password+'&grant_type=password';
        console.log(credentials);
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(this.BASE_URL, credentials, options)
            .map((response: Response) => { 
                let user = response.json();
                if(user && user.access_token) {
                    console.log("success");
                    localStorage.setItem('access_token', user.access_token);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.setIsLogged(true);
                } else {
                    
                }
            });
    }
}
