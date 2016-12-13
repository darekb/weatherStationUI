import { WeatherStationUIPage } from './app.po';

describe('weather-station-ui App', function() {
  let page: WeatherStationUIPage;

  beforeEach(() => {
    page = new WeatherStationUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
