import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class MeasurmentChartDataService {

  temperatureChartData = new EventEmitter<number[]>();
  humidityChartData = new EventEmitter<number[]>();
  pressureChartData = new EventEmitter<number[]>();

  constructor(private af:AngularFire) { 
    this.getDataForChart().subscribe(snaps => {
      let chartData = {
        t:[],
        h:[],
        p:[]
      }
      snaps.forEach(elem => {
        chartData.t.push(elem.temperature);
        chartData.p.push(elem.pressure);
        chartData.h.push(elem.humidity);
      });
      this.temperatureChartData.emit(chartData.t);
      this.humidityChartData.emit(chartData.h);
      this.pressureChartData.emit(chartData.p);
    });
  }

  getDataForChart(){
  	return this.af.database.list('sensors/data/', {
      query: {
        limitToLast: 531
      }
    });
  }

  getTemperatureChartData(){
    return this.temperatureChartData;
  }
  getHumidityChartData(){
    return this.humidityChartData;
  }
  getPressureChartData(){
    return this.pressureChartData;
  }

}
