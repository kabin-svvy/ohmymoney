import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';


describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeService: IncomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeComponent ],
      imports: [
        ModalModule.forRoot(), 
        HttpClientModule, 
        ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    incomeService = TestBed.inject(IncomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getIncomeByUserId service', () => {
    let expected: Income[];
    beforeEach(() => {
      expected = [
        {
          id: 1,
          incomeGroupName: 'งานประจำ',
          amount: 100000,
          date:'01/31/2019'
        }
      ] as Income[];
      spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of(expected));
      component.ngOnInit();
    });

    it('should call getIncomeByUserId service when call method ngOnInit', () => {
      expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
    });

    it('should set incomes when call get getIncomeByUserId is success', () => {
      expect(component.incomes).toBe(expected);
    });
  });

  describe('create reactive form ', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set empty in date of form', () => {
      expect(component.incomeForm.controls.date.value).toBe('');
    });
  
    it('should set empty in income group id of form', () => {
      expect(component.incomeForm.controls.incomeGroupId.value).toBe('');
    });
  
    it('should set empty in amount of form', () => {
      expect(component.incomeForm.controls.amount.value).toBe('');
    });
  });

  describe('getIncomeGroup service', () => {
    let expected: IncomeGroup[];
    beforeEach(() => {
      expected = [
        {
          id: 1,
          name: "เงินเดือน"
        },
        {
            id: 2,
            name: "รายได้เสริม"
        }
      ] as IncomeGroup[];
      spyOn(incomeService, 'getIncomeGroup').and.returnValue(of(expected));
      component.ngOnInit();
    });

    it('should call method getIncomeGroup when call ngOnInit', () => {
      expect(incomeService.getIncomeGroup).toHaveBeenCalled();
    });

    it('should set data in incomeGroup when call getIncomeGroup api is success', () => {
      expect(component.incomeGroup).toBe(expected);
    });

    it('should call method saveIncome when click submit button', () => {
      component.incomeForm.get('amount').setValue(70000);
      component.incomeForm.get('incomeGroupId').setValue(2);
      component.incomeForm.get('date').setValue("12/31/2019");
      spyOn(incomeService, 'saveIncome').and.returnValue(of([]));
      spyOn(component, 'getDateISOString').and.returnValue('2019-12-31T17:58:17.318Z');
      const expected = {
        incomeGroupId: 2,
        amount: 70000,
        date: "2019-12-31T17:58:17.318Z"
      } as IncomeRequest;
      component.onSubmit();
      expect(incomeService.saveIncome).toHaveBeenCalledWith(expected);
    });

    it('should get income by userID when called save income success', () => {
      component.incomeForm.get('amount').setValue(70000);
      component.incomeForm.get('incomeGroupId').setValue(2);
      component.incomeForm.get('date').setValue("12/31/2019");

      spyOn(component, 'getIncomeByUserId');
      spyOn(incomeService, 'saveIncome').and.returnValue(of([]));
      spyOn(component, 'getDateISOString').and.returnValue('2019-12-31T17:58:17.318Z');
      
      component.onSubmit();
      expect(component.getIncomeByUserId).toHaveBeenCalled();
    });

    it('should call method update income service when click edit', () => {
      spyOn(incomeService, 'updateIncome');
      spyOn(component, 'getDateISOString').and.returnValue('2019-12-31T17:58:17.318Z');

      component.incomeForm.get('amount').setValue(70000);
      component.incomeForm.get('incomeGroupId').setValue(2);
      component.incomeForm.get('date').setValue("12/31/2019");

      const id = 1;
      const input = {
        id:1,
        incomeGroupName: 'เงินเดือน',
        incomeGroupId: 2,
        amount: 70000,
        date: "12/31/2019"
      } as Income;

      const dataUpdate = {
        incomeGroupId: 2,
        amount: 70000,
        date: "2019-12-31T17:58:17.318Z"
      } as Income;

      component.edit(input);
      expect(incomeService.updateIncome).toHaveBeenCalledWith(
        input.id, 
        dataUpdate
      );
    });
  });
});
