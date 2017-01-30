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
  xMinMax:minMax;
  yMinMax:minMax;
  days:number[]  = [];

  constructor() { }

  getLinePoints(chartData) {
    var pointsTxt = ''; //'M0,100 ';
    var i = 0;
    var pointsArray = chartData.reduce(function (all, elem){
      all.push(elem.value);
      return all;
    },[]);
    var timestampArray = chartData.reduce(function (all, elem){
      all.push(elem.timestamp);
      return all;
    },[]);
    this.yMinMax = this.returnMinMax(pointsArray);
    this.xMinMax = this.returnMinMax(timestampArray);
    if (pointsArray.length > 1) {
      for (var k in pointsArray) {
        pointsTxt = pointsTxt + (i > 0 ? ' L' : 'M') + this.returnProperX(timestampArray[k]) + ',' + (this.plotHeight - this.returnProperY(pointsArray[k]));
        i = i + 1;
      }
    }
    return pointsTxt;
  }

  getMinMax(){
    return {
      xMinMax: this.xMinMax,
      yMinMax: this.yMinMax
    }
  }

  //getOtherLinePoints(chartData){
  //  var pointsTxt = ''; //'M0,100 ';
  //  var i = 0;
  //  var pointsArray = chartData.reduce(function (all, elem){
  //    all.push(elem.value);
  //    return all;
  //  },[]);
  //  var timestampArray = chartData.reduce(function (all, elem){
  //    all.push(elem.timestamp);
  //    return all;
  //  },[]);
  //  let lastValue = 0;
  //  if (pointsArray.length > 1) {
  //    for (var k in pointsArray) {
  //      if(lastValue != pointsArray[k]){
  //        lastValue = pointsArray[k];
  //      }
  //      pointsTxt = pointsTxt + (i > 0 ? ' L' : 'M') + this.returnProperX(timestampArray[k]) + ',' + (this.plotHeight - this.returnProperY(pointsArray[k]));
  //      i = i + 1;
  //    }
  //  }
  //  return pointsTxt;
  //}


  addDay(timestamp){
    this.days.push(new Date(timestamp).getDay());
  }

  getDays(){
    return this.days;
  }

  getDayLines(chartData){
    this.days = [];
    var _this = this;
    this.lastDay = this.returnDayFromDataString(chartData[0].date);
    return chartData.reduce(function (all, elem, i){
      if(_this.ifDayChange(elem.date)){
        _this.addDay(elem.timestamp);
        all.push(_this.returnProperX(elem.timestamp));
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
    out.delta = Math.abs(out.max - out.min);
    return out;
  }

  returnProperY(y:number):number {
    return Math.round(((y - this.yMinMax.min) * (this.plotHeight - 20) / this.yMinMax.delta) + 10);
  }

  returnProperX(x:number):number {
    return Math.round(((x - this.xMinMax.min) * this.plotWidth / this.xMinMax.delta));
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
