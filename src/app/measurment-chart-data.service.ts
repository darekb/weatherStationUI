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
        chartData.t.push({
          value:elem.temperature,
          date: elem.addedDate,
          timestamp: elem.addedTimestamp
        });
        chartData.p.push({
          value:elem.pressure,
          date: elem.addedDate,
          timestamp: elem.addedTimestamp
        });
        chartData.h.push({
          value:elem.humidity,
          date: elem.addedDate,
          timestamp: elem.addedTimestamp
        });
      });
      this.temperatureChartData.emit(chartData.t);
      this.humidityChartData.emit(chartData.h);
      this.pressureChartData.emit(chartData.p);
    });
  }

  getDataForChart(){
  	return this.af.database.list('sensors/data/', {
      query: {
        limitToLast: 200
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
