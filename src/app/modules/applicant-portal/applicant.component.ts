import { Component, ViewEncapsulation } from '@angular/core';
import { ApplicantDataService } from './services/applicant-shared.service';

@Component({
    selector     : 'app-applicant',
    templateUrl  : './applicant.component.html',
    styleUrls: ['./applicant.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ApplicantComponent
{
    constructor(private applicantDataService:ApplicantDataService){}

    ngOnInit(): void {
        let token = localStorage.getItem('token');
        if (token) {
            this.applicantDataService.loginEmitter.emit(true);
        }
    }

}
