import { Component, ViewEncapsulation } from '@angular/core';
import { ApplicantDataService } from '../applicant-portal/services/applicant-shared.service';

@Component({
    selector     : 'app-vendor',
    templateUrl  : './vendor.component.html',
    styleUrls: ['./vendor.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class VendorComponent
{
    constructor(private applicantDataService:ApplicantDataService){}

    ngOnInit(): void {
        let token = localStorage.getItem('token');
        if (token) {
            this.applicantDataService.loginEmitter.emit(true);
        }
    }

}
