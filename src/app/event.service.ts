import { Injectable } from '@angular/core';
import {Event} from './models/event'
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class EventServices {
    private BASE_URL = "http://localhost:5000/api/eventapi";

    constructor(private http: Http) {}

    private handleErrors(error : any) {
        console.error('An error has occured.', error);
        return Promise.reject(error.message || error);
    }

    getEvents(): Promise<Event[]> {
        return this.http.get(this.BASE_URL)
            .toPromise()
            .then(response => response.json() as Event[])
            .catch(this.handleErrors);
    }

    getEventsById(id : number): Promise<Event> {
        return this.getEvents()
            .then(result => result.find(event => event.eventId === id));
    }

}