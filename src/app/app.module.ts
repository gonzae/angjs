import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { ResultsComponent } from './results/results.component';
import { TableComponent } from './results/table/table.component';
import { PiesComponent } from './results/pies/pies.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ResultsComponent,
    TableComponent,
    PiesComponent,
  ],
  imports: [
    BrowserModule,
    ChartModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
