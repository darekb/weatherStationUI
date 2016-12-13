/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeasurmentsChartCalculateService } from './measurments-chart-calculate.service';

describe('MeasurmentsChartCalculateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurmentsChartCalculateService]
    });
  });

  it('should ...', inject([MeasurmentsChartCalculateService], (service: MeasurmentsChartCalculateService) => {
    expect(service).toBeTruthy();
  }));
});
