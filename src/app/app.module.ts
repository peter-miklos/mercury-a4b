import { BrowserModule }                from '@angular/platform-browser';
import { NgModule }                     from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }                   from '@angular/http';
import { MaterialModule }               from '@angular/material';
import 'hammerjs';

import { AppComponent }                 from './app.component';
import { SearchComponent }              from './search/search.component';
import { routing, appRoutingProviders } from './app-routing.module';
import { SearchService  }               from './_services/search.service';
import { FormControlService }           from './_services/form-control.service';
import { EditComponent }                from './edit/edit.component';
import { NewComponent }                 from './new/new.component';

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
    ReactiveFormsModule,
    HttpModule,
    routing,
    MaterialModule
  ],
  providers: [
    appRoutingProviders,
    SearchService,
    FormControlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
