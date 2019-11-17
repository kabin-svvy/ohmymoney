import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IncomeRequest } from 'src/app/models/income-request';

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
      `${service.SERVER_URL}/income/id/24`
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

  it('should call method post url add user api', () => {
    const dataRequest = {
      incomeGroupId: 2,
      amount: 70000,
      date: "12/31/2019"
    } as IncomeRequest;
    service.saveIncome(dataRequest).subscribe();
    const req = httpTestingController.expectOne(
      `${service.SERVER_URL}/income`
    );
    expect(req.request.method).toBe('POST');
  });

  it('should set income request body with user id when call method save income', () => {
    const dataRequest = {
      incomeGroupId: 2,
      amount: 70000,
      date: "12/31/2019"
    } as IncomeRequest;

    const expected = {
      userId: 24,
      incomeGroupId: 2,
      amount: 70000,
      date: "12/31/2019"
    } as IncomeRequest;
    service.saveIncome(dataRequest).subscribe();
    const req = httpTestingController.expectOne(
      `${service.SERVER_URL}/income`
    );
    expect(req.request.body).toEqual(expected);
  });
});
