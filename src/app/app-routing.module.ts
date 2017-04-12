import { NgModule, OnInit }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent }   from './events/events.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'events',  component: EventsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{}

