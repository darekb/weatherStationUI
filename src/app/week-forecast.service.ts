import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class WeekForecastService {

  constructor(private af:AngularFire) {}

  getWeekForecast(){
  	return this.af.database.list('/weekForecast/-KYDznpu6BmcMLBxnKj2', {
      query: {
        limitToFirst: 6
      }
    })
  }

}
