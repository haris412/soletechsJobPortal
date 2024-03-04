import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-competencies-common',
  templateUrl: './competencies-common.component.html',
  styleUrls: ['./competencies-common.component.scss']
})
export class CompetenciesCommonComponent implements OnInit {

  constructor(public sharedService: SharedService) { }

  async ngOnInit() {}

}
