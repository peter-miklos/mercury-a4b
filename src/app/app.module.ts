import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { FormsModule }                  from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { MaterialModule }               from '@angular/material';
import 'hammerjs';

import { AppComponent }                 from './app.component';
import { SearchComponent }              from './search/search.component';
import { routing, appRoutingProviders } from './app-routing.module';
import { SearchService  }               from './_services/search.service';
import { EditComponent }                from './edit/edit.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent,
    NewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule
  ],
  providers: [
    appRoutingProviders,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
