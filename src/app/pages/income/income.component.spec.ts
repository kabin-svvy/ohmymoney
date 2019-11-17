import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';


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
    });

    it('should call getIncomeByUserId service when call method ngOnInit', () => {
      component.ngOnInit();
      expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
    });

    it('should set incomes when call get getIncomeByUserId is success', () => {
      component.ngOnInit();
      expect(component.incomes).toBe(expected);
    });
  });

  describe('create reactive form ', () => {
    it('should set empty in date of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.date.value).toBe('');
    });
  
    it('should set empty in income group id of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.incomeGroupId.value).toBe('');
    });
  
    it('should set empty in amount of form', () => {
      component.ngOnInit();
      expect(component.incomeForm.controls.amount.value).toBe('0');
    });
  });
});
