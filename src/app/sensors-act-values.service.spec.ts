/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SensorsActValuesService } from './sensors-act-values.service';

describe('SensorsActValuesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SensorsActValuesService]
    });
  });

  it('should ...', inject([SensorsActValuesService], (service: SensorsActValuesService) => {
    expect(service).toBeTruthy();
  }));
});
