import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AppLookUpService } from "src/app/app-services/app-look-up.service";
import { SaveJob } from "src/app/models/saveJob.model";

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    token: string = '';
    public email: string = "";
    public isUserLoggedIn: boolean = false;
    public dataAreaId: string = "USMF";
    public languageId: string = "en-us";

    constructor(public lookupService: AppLookUpService,
                public toastrService: ToastrService,
                private router:Router) { }

    GetToken() {
        return localStorage.getItem('token');
    }

    SetToken(token: string) {
        localStorage.setItem('token', token);
    }

    
  async SaveJob(job:any){
    if (localStorage.getItem("email")) {
      let applicantId = localStorage.getItem("applicantId") ?? '';
      try {
        let jobData:SaveJob = {
          applicantId:applicantId,
          jobId:job?.jobId
        }
        let savedJobResponse = await this.lookupService.SavedApplicantJobs(jobData);
        if (savedJobResponse?.Status) {
          this.toastrService.success("Job Saved Successfully");
        } else {
          this.toastrService.error(savedJobResponse?.Message);;
        }
      } catch (ex) {
        console.error()
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}