import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event';
import { EventServices } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  week : number = 0;
  isAuth : boolean;
  selected : Event;
  events : Event[];
  thisWeeksEvents : Event[];
  thisWeeksDays : Set<string>;
  dayOfWeek : string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  constructor( private eventServices : EventServices ) { }

  onSelect(event: Event): void {
    this.selected = event;
  }

  isAuthenticated() : boolean {
      let user = localStorage.getItem("access_token");
      if(user)
        this.isAuth = true;
      else
        this.isAuth = false;
      return this.isAuth;
    }

  clickRight() : void {
    this.week += 7;
    this.getEvents(this.week);
  }

  clickLeft() : void {
    this.week -= 7;
    this.getEvents(this.week);
  }

  getEvents(week : number = 0) : void {
    this.eventServices.getEvents().then(events => {
      this.events = events;
      var thisWeeksDays = new Set(); 
      var thisWeeksEvents = new Array();
      
      this.filterForThisWeekDates(this.events, thisWeeksEvents, week);
      this.sortDates(thisWeeksEvents);
      this.formatAllEventDates(thisWeeksEvents, thisWeeksDays);
      
      this.thisWeeksDays = thisWeeksDays;
    });
  }

  private sortDates(thisWeeksEvents : Event[]) : void {
      this.thisWeeksEvents = thisWeeksEvents;
      this.thisWeeksEvents.sort((n1,n2) => { 
        let dateOne = new Date(n1.eventDate);
        let dateTwo = new Date(n2.eventDate);
        return this.getTime(dateOne) - this.getTime(dateTwo); 
      });
  }

  private filterForThisWeekDates(events : Event[], thisWeeksEvents : Event[], week : number) : void {
    var curr = new Date;
    
      var weekStart = new Date(curr.setDate(curr.getUTCDate() - curr.getUTCDay()+1 + week));
      var weekEnd = new Date(curr.setDate(curr.getUTCDate() - curr.getUTCDay()+7));
      weekStart.setHours(0,0,0,0);
      weekEnd.setHours(0,0,0,0);

      for(let i = 0; i < this.events.length; i++) {
        
        let eventTo = new Date(this.events[i].dateTo);
        let eventFrom = new Date(this.events[i].dateFrom);

        if(eventTo >= weekStart && eventFrom <= weekEnd) {
          events[i].dateTo = (this.formatEventTime(eventTo));
          events[i].dateFrom = (this.formatEventTime(eventFrom));
          thisWeeksEvents.push(events[i]);
        }
      }
  }

  private formatAllEventDates(thisWeeksEvents : Event[], thisWeeksDays : Set<String>) : void {
    for(let i = 0; i < this.thisWeeksEvents.length; i++) {
        let eventDate = new Date(this.thisWeeksEvents[i].eventDate);
        this.thisWeeksEvents[i].eventDate = (this.formatEventDate(eventDate));
        thisWeeksDays.add(this.thisWeeksEvents[i].eventDate);
      }
  }

  private getTime(date?: Date) {
      return date != null ? date.getTime() : 0;
  }

  formatEventTime(date:Date) : string {
    var hour = date.getUTCHours();
    var minutes = (date.getUTCMinutes()<10?'0':'') + date.getUTCMinutes();
    var seconds = (date.getUTCMilliseconds()<10?'0':'') + date.getUTCMilliseconds();
    return hour+':'+minutes + ':'+seconds;
  }

  isCorrectDate(date1 : string,date2 : string) : boolean {
    if(date1 === date2)
      return true;
    return false;
  }

  isDoubleDate(date1:string) : boolean {
    
    return false;
  }


  formatEventDate(d:Date) : string {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var date = d.getUTCDate();
    var monthIndex = d.getUTCMonth();
    var year = d.getFullYear();
    var day = d.getUTCDay();
    if(day == 0) {
      day = 7;
    }
    return date + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + this.dayOfWeek[day-1];
  }

  ngOnInit() : void {
    this.getEvents();
  }

}
