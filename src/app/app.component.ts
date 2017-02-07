import { Component, OnInit} from '@angular/core';
import { WeekForecastService } from './week-forecast.service'
import { SensorsActValuesService } from './sensors-act-values.service'

@Component({
  selector: 'app-root',
  template: `
    <div class="all">
        <div class="row">
          <div class="col s6 measurmentsColumn">
            <app-measurement-card *ngFor="let m of measurments" [measurement]="m"></app-measurement-card>
            <p class="comment">Pomiary z godziny: {{lastMeasureTime}}</p>
          </div>
          <div class="col s4">
            <app-weathercast-today></app-weathercast-today>
          </div>
          <div class="col s2">
            <app-weathercast-week *ngFor="let weathercast of weathercastWeek" [weathercast]="weathercast"></app-weathercast-week>
          </div>
        </div>
    </div>
  `,
  styles: [`
    .all{
      width:100%;
      height:100%;
    }
    .measurmentsColumn{
      position:relative;
    }
    .comment{
      text-align:right;
      font-family: 'Roboto';
      font-weight: 100;
      font-size:1.5vw;
      position:absolute;
      bottom:-25px;
      right:25px;
    }
  `]
})
export class AppComponent  implements OnInit {

  weathercastWeek = [];
  measurments = [{
      type: 'temperature',
      title: 'Temperatura',
      value: "0",
      unit:'°C'
    },
    {
      type: 'pressure',
      title: 'Ciśnienie',
      value: "0",
      unit:'hPa'
    },
    {
      type: 'humidity',
      title: 'Wilgotność',
      value: "0",
      unit:'%'
    }
  ];
  lastMeasureTime:string = '';

  constructor(private weekForecastService:WeekForecastService, private sensorsActValuesService: SensorsActValuesService) {
  }

  ngOnInit() {
    this.weekForecastService.getWeekForecast().subscribe(weekData => {
      this.weathercastWeek = weekData;
    });
    this.sensorsActValuesService.getActValues().subscribe(snaps => {
      snaps.forEach((actMeasurments, index) => {
       if(actMeasurments.sensorId==11){
          //console.log('AppComponent.ngOnInit() sensorID: ' + actMeasurments.sensorId + ' temp:'+ actMeasurments.temperature);
          this.updateMeasurments(actMeasurments);
          this.lastMeasureTime = actMeasurments.addedDate;
          let t = actMeasurments.addedDate.split(' ');
          let t1 = t[1].split(':');
          this.lastMeasureTime = t1[0] + ':' + t1[1] + ':' + t1[2] + ' ' + t[0];
        } else if(actMeasurments.sensorId==12) {
          this.measurments[0].value = parseFloat(Math.round(((this.measurments[0].value*1 + actMeasurments.temperature*1)/2)*100)/100).toFixed(2);
        }
      });
    });
  }
  updateMeasurments(data) {
    this.measurments[0].value = data.temperature;
    this.measurments[1].value = parseFloat(Math.round(data.pressure*1)/100).toFixed(2);
    this.measurments[2].value = parseFloat(data.humidity*1).toFixed(2);
  }
}
