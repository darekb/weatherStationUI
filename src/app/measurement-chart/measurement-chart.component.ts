import { Component, OnInit, Input } from '@angular/core';
import { MeasurmentsChartCalculateService } from '../measurments-chart-calculate.service'
import { MeasurmentChartDataService } from '../measurment-chart-data.service'

@Component({
  selector: 'app-measurement-chart',
  template: `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 531 90" class="measuerChart" >
    <line [attr.x1]="xVal" y1="0" [attr.x2]="xVal" y2="90" class="dayLine" *ngFor="let xVal of dayLines" />
    <path class="measureLine" [attr.d]="linePointsString"></path>
  </svg>
  `,
  styles: [`
  .measuerChart{
    border:1px solid #707070;
    width:100%;
    margin:0;
    padding:0;
  }
  .measureLine{
    fill:none;
    stroke:rgba(0,255,0,0.6);
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
  dayLines:number[] = [];

  constructor(private measurmentsChartCalculateService: MeasurmentsChartCalculateService, private measurmentChartDataService:MeasurmentChartDataService) {}

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
    this.dayLines = this.measurmentsChartCalculateService.getDayLines(data);
    this.linePointsString =  this.measurmentsChartCalculateService.getLinePoints(data);
  }
}
