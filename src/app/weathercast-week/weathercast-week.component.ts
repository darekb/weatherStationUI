import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weathercast-week',
  templateUrl: `
<div class="weekdayName">{{weathercast.weekday}}</div>
<div>
	<img src="http://icons.wxug.com/i/c/v4/{{weathercast.icon}}.svg" class="icon"/>
</div>
<div class="temp">{{weathercast.low}}&deg;C/{{weathercast.high}}&deg;C</div>
`,
  styles: [`
.weekdayName{
	text-transform:uppercase;
	font-size:18px;
	font-weight:300;
}
.icon{
	height:45px;
	margin:auto;
}
.conditions{
	text-transform:uppercase;
	font-size:10px;
}
.temp{
	margin-bottom:20px;
}
div{
	margin:0;
	padding:0;
	text-align: center;
}
  `]
})
export class WeathercastWeekComponent implements OnInit {
  @Input() weathercast = []
  constructor() { }

  ngOnInit() {
  }

}