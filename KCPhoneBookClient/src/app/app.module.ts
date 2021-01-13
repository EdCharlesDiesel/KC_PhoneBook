import { SharedModule } from './shared/shared.module';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule  } from 'angular-in-memory-web-api';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './home/shell.component';
import { MenuComponent } from './home/menu.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

/* Feature Modules */

import { PersonData } from './persons/person-data';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
  //  HttpClientInMemoryWebApiModule.forRoot(PersonData), 
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    ShellComponent,    
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
