import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
