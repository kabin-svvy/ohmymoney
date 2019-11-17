import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income/income.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';
import { debounceTime, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {

  constructor(
    private modalService: BsModalService, 
    private http: HttpClient, 
    private incomeService: IncomeService,
    private fb: FormBuilder) { }

  modalRef: BsModalRef;
  incomes: Income[];
  incomeForm: FormGroup;
  incomeGroup: IncomeGroup[];
  searchText: FormControl;
  subscription = new Subscription();

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getIncomeByUserId();
    this.createForm();
    this.getIncomeGroup();

    this.subscription.add(
      this.searchText.valueChanges
      .pipe(
        filter(v => v.length !== 0),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(v => this.incomeService.findIncome(v))
      ).subscribe(v => {
        console.log(v);
        this.incomes = v.map(n => ({...n, incomeGroupName: n.incomeNameGroupId}));
      })
    );
  }

  private getIncomeGroup() {
    this.incomeService.getIncomeGroup().subscribe(incomeGroup => {
      this.incomeGroup = incomeGroup;
    });
  }

  createForm() {
    this.searchText = new FormControl('');
    this.incomeForm = this.fb.group({
      date: '',
      incomeGroupId: '',
      amount:''
    });
  }

  getIncomeByUserId() {
    this.incomeService.getIncomeByUserId().subscribe(incomes => {
      this.incomes = incomes;
    });
  }

  openModal(template: TemplateRef<any>, income?: Income) {
    this.modalRef = this.modalService.show(template);
    if(income) {
      this.incomeForm.get('date').setValue(this.getDateFromISOString(income.date));
      this.incomeForm.get('amount').setValue(String(income.amount));
      this.incomeForm.get('incomeGroupId').setValue(String(income.incomeGroupId));
    } else {
      this.incomeForm = this.fb.group({
        date: '',
        incomeGroupId: '',
        amount:''
      });
    }
  }

  onSubmit() {
    const data = {
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value),
      amount: Number(this.incomeForm.get('amount').value),
      date: this.getDateISOString(this.incomeForm.get('date').value)
    } as IncomeRequest;
    this.incomeService.saveIncome(data).subscribe(_ => {
      this.getIncomeByUserId();
      // this.modalRef.hide();
    });
  }

  getDateFromISOString(date: string): Date {
    return new Date(date);
  }

  getDateISOString(date: string): string {
    return new Date(date).toISOString();
  }

  edit(income: Income) {
    const data = {
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value),
      amount: Number(this.incomeForm.get('amount').value),
      date: this.getDateISOString(this.incomeForm.get('date').value)
    } as IncomeRequest;
    this.incomeService.updateIncome(income.id, data);
  }
}
