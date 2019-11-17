import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('IncomeService', () => {
  let service: IncomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IncomeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call method get with url get income api', () => {
    service.getIncomeByUserId().subscribe();
    const req = httpTestingController.expectOne(
      `${service.SERVER_URL}/income/id/1`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should call method get url get income group api', () => {
    service.getIncomeGroup().subscribe();
    const req = httpTestingController.expectOne(
      `${service.SERVER_URL}/income/group`
    );
    expect(req.request.method).toBe('GET');
  });
});
