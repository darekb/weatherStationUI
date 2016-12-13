import { Component, OnInit, Input } from '@angular/core';
import { TodayForecastService } from '../today-forecast.service'

@Component({
  selector: 'app-measurement-card',
  template: `
    <div class="measurmentCard">
      <div class="row">
        <div class="col s12">
          <h1 class="title">{{measurement.title}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col s6">
          <h2 class="value big">{{measurement.value}}</h2>
        </div>
        <div class="col s2">
          <h2 class="value unit">{{measurement.unit}}</h2>
        </div>
        <div class="col s3" *ngIf="measurement.formToValuesPresent">
          <span class="value small">od:{{measurement.from}}{{measurement.unit}}<br/>do:{{measurement.to}}{{measurement.unit}}</span>
        </div>
        <div class="col s3" *ngIf="measurement.averagePresent">
          <span class="value small">srednio:<br/>{{measurement.average}}{{measurement.unit}}</span>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <app-measurement-chart [type]="measurement.type"></app-measurement-chart>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .measurmentCard{
      position: relative;
      overflow:hidden;
    }
    .col{
      position: relative;
      z-index:1;
    }
    .value{
      font-family: 'WWDigital';
      z-index:3;
      margin:0;
      padding:0;
    }
    .value.big{
      font-size:6vw;
      line-height: 6vw;
      text-align: right;
    }
    .value.unit{
      font-size:2vw;
      line-height: 3vw;
      text-align: left;
    }
    .value.small{
      font-size:2vw;
      color:#c0c0c0;
    }
    .title {
      text-transform: uppercase;
      font-family: 'Roboto';
      font-weight: 100;
      margin:2% 0 -3% 0;
      padding:0;
      font-size:2vw;
      z-index:-1;
    }
  `]
})
@Input()
export class MeasurementCardComponent implements OnInit {
  @Input() measurement = {
    title: '',
    value: 0,
    unit: '',
    type: '',
    from:0,
    to:0,
    average: 0,
    formToValuesPresent:false,
    averagePresent:false
  };
  constructor(private todayForecastSevice:TodayForecastService) {}

  ngOnInit() {
    this.todayForecastSevice.getTodayForecast()
      .subscribe(snaps => {
        snaps.forEach((today, index) => {
          if(index==0){
            if(this.measurement.type == 'temperature'){
              this.measurement.from = today.tempMin;
              this.measurement.to = today.tempMax;
              this.measurement.formToValuesPresent = true;
            }
            if(this.measurement.type == 'humidity'){
              this.measurement.average = today.aveHumidity;
              this.measurement.averagePresent = true;
            }
          }
        });
      });
  }

}
