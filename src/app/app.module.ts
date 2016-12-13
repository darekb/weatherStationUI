import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config'

import { TodayForecastService } from './today-forecast.service'
import { WeekForecastService } from './week-forecast.service'
import { MeasurmentChartDataService } from './measurment-chart-data.service'
import { MeasurmentsChartCalculateService } from './measurments-chart-calculate.service'
import { SensorsActValuesService } from './sensors-act-values.service'

import { AppComponent } from './app.component';
import { MeasurementCardComponent } from './measurement-card/measurement-card.component';
import { MeasurementChartComponent } from './measurement-chart/measurement-chart.component';
import { WeathercastTodayComponent } from './weathercast-today/weathercast-today.component';
import { WeathercastWeekComponent } from './weathercast-week/weathercast-week.component';

@NgModule({
  declarations: [
    AppComponent,
    MeasurementCardComponent,
    MeasurementChartComponent,
    WeathercastTodayComponent,
    WeathercastWeekComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    TodayForecastService,
    WeekForecastService,
    MeasurmentChartDataService,
    MeasurmentsChartCalculateService,
    SensorsActValuesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
