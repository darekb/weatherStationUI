import { Component, OnInit } from '@angular/core';
import { TodayForecastService } from '../today-forecast.service'

@Component({
  selector: 'app-weathercast-today',
  template: `
    <h1>{{today.dayName}}</h1>
    <div *ngFor="let t of today.data">
      <img src="http://icons.wxug.com/i/c/v4/{{t.icon}}.svg" class="icon"/>
      <h2>{{t.title}}</h2>
      <p>
        {{t.content}}
      </p>
    </div>
    <p class="comment">Prognoza z godziny: {{today.forecastData}}</p>
  `,
  styles: [`
    h1{
      text-transform: uppercase;
      font-family: 'Roboto';
      font-weight: 100;
      font-size:2vw;
    }
    h2{
      font-family: 'Roboto';
      font-weight: 100;
      padding:0;
      font-size:2vw;
    }

    p{
      font-family: 'Roboto';
      font-weight: 400;
      font-size:2vw;
    }
    .comment{
      text-align:right;
      font-family: 'Roboto';
      font-weight: 100;
      font-size:1.5vw;
    }
    .icon{
      float:right;
      width:30%;
    }
  `]
})
export class WeathercastTodayComponent implements OnInit {
  today = {
    data: [],
    forecastData: ''
  }

  constructor(private todayForecastSevice:TodayForecastService) {
  }

  ngOnInit() {
    this.todayForecastSevice.getTodayForecast()
      .subscribe(snaps => {
        snaps.forEach((today, index) => {
          if (index == 0) {
            this.today = today;
            let t = this.today.forecastData.split(' ');
            let t1 = t[1].split(':');
            let newHour = parseInt(t1[0],10) + 1;
            this.today.forecastData = newHour + ':' + t1[1] + ':' + t1[2] + ' ' + t[0];
            console.log('WeathercastTodayComponent.ngOnInit() this.today', this.today);
          }
        });
      });
  }
}
