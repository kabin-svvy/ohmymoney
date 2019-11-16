import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';


describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeService: IncomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeComponent ],
      imports: [ModalModule.forRoot(), HttpClientModule]
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

  it('should call getIncomeByUserId service when call method ngOnInit', () => {
    spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of([]));
    component.ngOnInit();
    expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
  });

  it('should set incomes when call get getIncomeByUserId is success', () => {
    const expected = [
      {
        id: 1,
        incomeNameGroupId: 'งานประจำ',
        amount: 100000,
        date:'01/31/2019'
      }
    ] as Income[];
    
    spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of(expected));

    component.ngOnInit();

    expect(component.incomes).toBe(expected);
  });
});
