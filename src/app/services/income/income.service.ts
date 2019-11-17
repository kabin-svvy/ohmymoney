import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  SERVER_URL : string;
  constructor(private http: HttpClient) { 
    this.SERVER_URL = 'https://working-with-angular.herokuapp.com';
  }

  getIncomeByUserId(): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.SERVER_URL}/income/id/1`);
  }

  getIncomeGroup(): Observable<IncomeGroup[]> {
    return this.http.get<IncomeGroup[]>(`${this.SERVER_URL}/income/group`);
  }

  saveIncome(income: IncomeRequest) {
    income.userId = 24;
    return this.http.post(`${this.SERVER_URL}/income`, income);
  }
}
