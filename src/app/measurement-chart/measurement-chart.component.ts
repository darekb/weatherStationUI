import { Component, OnInit, Input } from '@angular/core';
import { MeasurmentsChartCalculateService } from '../measurments-chart-calculate.service'
import { MeasurmentChartDataService } from '../measurment-chart-data.service'
import { TodayForecastService } from '../today-forecast.service'

@Component({
  selector: 'app-measurement-chart',
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 531 90" class="measuerChart" >
    <g *ngFor="let xVal of dayLines; let i = index">
      <line [attr.x1]="xVal" y1="0" [attr.x2]="xVal" y2="90" class="dayLine"  />
      <text [attr.x]="xVal + 10" y="18" class="descriptionFont">{{days[i]}}</text>
    </g>
    <path class="otherLine" [attr.d]="maxTemp"></path>
    <path class="otherLine" [attr.d]="minTemp"></path>
    <path class="measureLine" [attr.d]="linePointsString"></path>
    <rect x="0" y="4" height="20" width="60" class="descriptionFontBackground" />
    <rect x="0" y="70" height="20" width="60" class="descriptionFontBackground" />
    <text x="7" y="18" class="descriptionFont">{{maxValue}}</text>
    <text x="7" y="84" class="descriptionFont">{{minValue}}</text>
  </svg>
  `,
  styles: [`
  .measuerChart{
    border:1px solid #707070;
    width:100%;
    margin:0;
    padding:0;
  }
  .descriptionFont{
    font-family:WWDigital;
    font-size:15px;
    fill:rgba(255,255,255,0.6);
  }
  .descriptionFontBackground{
    stroke:none;
    fill:gray;
  }
  .measureLine{
    fill:none;
    stroke:rgba(0,255,0,0.6);
    stroke-width:2px;
  }
  .otherLine{
    fill:none;
    stroke:rgba(255,255,0,0.2);
    stroke-width:2px;
  }
  .dayLine{
    fill:none;
    stroke:rgba(255,255,255,0.15);
    stroke-width:2px;
  }
  `]
})


export class MeasurementChartComponent implements OnInit {

  @Input() type = '';

  linePointsString:string = '';
  maxTemp:string = '';
  minTemp:string = '';
  dayLines:number[] = [];
  maxValue:string = '';
  minValue:string = '';
  daysArray:string[] = [
    '',
    'Poń',
    'Wto',
    'Środ',
    'Czw',
    'Pią',
    'Sob',
    'Nie'
  ];
  days:string[] = [];


  constructor(private measurmentsChartCalculateService: MeasurmentsChartCalculateService, private measurmentChartDataService:MeasurmentChartDataService, private todayForecastService:TodayForecastService) {}

  ngOnInit() {
    switch(this.type){
      case 'temperature':
        this.measurmentChartDataService.getTemperatureChartData().subscribe(snaps => {
          this.updateChart(snaps);
        });
      break;
      case 'pressure':
        this.measurmentChartDataService.getPressureChartData().subscribe(snaps => {
          this.updateChart(snaps);
        });
      break;
      case 'humidity':
        this.measurmentChartDataService.getHumidityChartData().subscribe(snaps => {
          this.updateChart(snaps);
        });
      break;
    }
  }
  updateChart(snaps){
    let data = [];
    snaps.forEach(elem => {
      data.push(elem);
    });
    this.linePointsString =  this.measurmentsChartCalculateService.getLinePoints(data);
    this.dayLines = this.measurmentsChartCalculateService.getDayLines(data);
    this.updateDays();
    this.updateMinMax();
    // if(this.type == 'temperature'){
    //   this.todayForecastService.get530Forecast().subscribe(snaps => {
    //     let data = [];
    //     snaps.forEach(elem => {
    //       let d = elem.forecastData;
    //       data.push({
    //         value: parseInt(elem.tempMax, 10),
    //         timestamp: new Date(d.substring(6,10), (d.substring(3,5)-1), d.substring(0,2), d.substring(11,13), d.substring(14,16), d.substring(17,19), 0).getTime()
    //       });
    //     });
    //     this.maxTemp =  this.measurmentsChartCalculateService.getOtherLinePoints(data);
    //     console.log(this.maxTemp);
    //   });
    // }
  }
  updateDays(){
    var _this = this;
    var t = this.measurmentsChartCalculateService.getDays();
    t.forEach(function (elem){
      _this.days.push(_this.daysArray[elem]);
    });
  }
  updateMinMax(){
    let t = this.measurmentsChartCalculateService.getMinMax();
    if(this.type == 'pressure'){
      t.yMinMax.max = Math.round(t.yMinMax.max)/100
      t.yMinMax.min = Math.round(t.yMinMax.min)/100
    }
    this.maxValue = Math.round(t.yMinMax.max) + '';
    this.minValue = Math.round(t.yMinMax.min) + '';
    // if(this.minValue.length != this.maxValue.length){
    //   if(this.minValue.length > this.maxValue.length){
    //     this.maxValue = '   ' +  this.maxValue;
    //   } else {
    //     this.minValue = '   ' +  this.minValue;
    //   }
    // }
  }
}
