import { Activity } from './activity';

export class Event {
    eventId : number;
    eventDate : string;
    dateFrom : string;
    dateTo : string;
    username : string;
    creationDate : string;
    isActive : Boolean;
    activityId : number;
    activity : Activity;
}