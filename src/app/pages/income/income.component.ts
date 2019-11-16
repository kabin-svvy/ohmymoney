import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income/income.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private modalService: BsModalService, private http: HttpClient, private incomeService: IncomeService) { }

  modalRef: BsModalRef;

  incomes: Income[];

  incomeForm: FormGroup;

  ngOnInit() {
    this.incomeService.getIncomeByUserId().subscribe(incomes => {
      this.incomes = incomes;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
