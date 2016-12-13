import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class TodayForecastService {

  constructor(private af:AngularFire) {}

  getTodayForecast(){
  	return this.af.database.list('/todayForecast/', {
      query: {
        limitToLast: 1
      }
    });
  }

}
