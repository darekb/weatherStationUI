import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SensorsActValuesService {

  constructor(private af:AngularFire) { }

  getActValues(){
  	return this.af.database.list('sensors/actVal/', {
      query: {
        limitToLast: 1
      }
    });
  }

}
