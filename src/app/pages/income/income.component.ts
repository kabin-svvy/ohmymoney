import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private modalService: BsModalService, private http: HttpClient) { }

  modalRef: BsModalRef;

  incomes: Income[];

  ngOnInit() {
    this.http.get('http://103.74.254.157:9003/income/id/1')
    .subscribe((incomes: Income[]) =>{
      this.incomes = incomes;
    });
    this.incomes = [
      {
        id:1,
        incomeGroupId:1,
        incomeNameGroupId:1,
        amount:10000,
        date:'01/31/2019'
      },
      {
        id:2,
        incomeGroupId:2,
        incomeNameGroupId:2,
        amount:20000,
        date:'02/28/2019'
      },
    ];
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
