import { Injectable } from '@angular/core';

interface minMax {
  min:number
  max:number
  delta:number
}

@Injectable()
export class MeasurmentsChartCalculateService {

  plotWidth:number = 531;
  plotHeight:number = 90;
  lastDay:number = 0;

  constructor() { }

  getLinePoints(chartData) {
    var pointsTxt = ''; //'M0,100 ';
    var i = 0;
    var pointsArray = chartData.reduce(function (all, elem){
      all.push(elem.value);
      return all;
    },[]);
    var data = pointsArray
      .slice((pointsArray.length - this.plotWidth < 0 ? 0 : pointsArray.length - this.plotWidth), pointsArray.length)
      .map(function (elem) {
        return parseFloat(elem);
      });
    var minMax = this.returnMinMax(data);
    if (data.length > 1) {
      for (var k in data) {
        pointsTxt = pointsTxt + (i > 0 ? ' L' : 'M') + this.returnProperX(parseInt(k, 10), data.length) + ',' + (this.plotHeight - this.returnProperY(data[k], minMax));
        i = i + 1;
      }
    }
    return pointsTxt;
  }

  getDayLines(chartData){
    var _this = this;
    var dataLength = chartData.length;
    this.lastDay = this.returnDayFromDataString(chartData[0].date);
    return chartData.reduce(function (all, elem, i){
      if(_this.ifDayChange(elem.date)){
        all.push(_this.returnProperX(parseInt(i, 10), dataLength));
      }
      return all;
    },[]);
  }

  returnMinMax(dataIn:Array<number>):minMax {
    var out = {
      min: 10000000000000,
      delta: 10000000000000,
      max: 0
    };
    dataIn.forEach(function (elem) {
      if (elem > out.max) {
        out.max = elem;
      }
      if (elem < out.min) {
        out.min = elem;
      }
    });
    out.min = out.min;
    out.max = out.max;
    out.delta = Math.abs(out.max - out.min);
    return out;
  }

  returnProperY(y:number, minMax:minMax):number {
    return Math.round(((y - minMax.min) * (this.plotHeight - 20) / minMax.delta) + 10);
  }

  returnProperX(x:number, dataLength:number):number {
    //return x;
    return Math.round(x * (this.plotWidth / dataLength));
  }

  ifDayChange(dataString:string): boolean {
    var d = this.returnDayFromDataString(dataString);
    if(d != this.lastDay){
      this.lastDay = d;
      return true;
    }
    return false;
  }

  returnDayFromDataString(dataString:string): number {
    return parseInt(dataString.substring(0,2),10);
  }

}
