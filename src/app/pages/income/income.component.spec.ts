import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income/income.service';


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
    spyOn(incomeService, 'getIncomeByUserId');
    component.ngOnInit();
    expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
  });
});
