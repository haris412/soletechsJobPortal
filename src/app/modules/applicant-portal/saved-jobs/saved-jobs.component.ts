import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ApplicantDataService } from '../services/applicant-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.scss']
})
export class SavedJobsComponent implements OnInit,OnChanges {
  @Input() savedJobs:any[] = [];
  jobList:any[]=[];
  constructor(private router:Router,
              public applicantService: ApplicantDataService,
              public sharedService: SharedService,
              public translationService: TranslationAlignmentService) {
                this.translationService.languageChange.subscribe(x => {
                  this.translationService.isTranslate = x;
                  this.SavedJobsLanguageChanges();
                });
              }
  async ngOnInit() {
    this.sharedService.savedJobsCopy = this.sharedService.DeepCopyObject(this.savedJobs);
    this.SavedJobsLanguageChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.savedJobs?.currentValue){
      this.savedJobs = changes.savedJobs.currentValue;
      this.sharedService.savedJobsCopy = this.sharedService.DeepCopyObject(this.savedJobs);
    }
  }
  GoToJobs() {
    this.router.navigate(['/jobs']);
  }

  selectJob(job: any) {
    this.applicantService.selectedSavedJob = job;
    this.router.navigate(['/jobs']);
  }
  SavedJobsLanguageChanges() {
    if (this.savedJobs?.length > 0) {
      if (this.translationService.isTranslate) {
        for(let i = 0; i < this.savedJobs.length; i++) {
          this.savedJobs[i].recruitingId = this.sharedService.savedJobsCopy[i]?.RecruitingArabic ? this.sharedService.savedJobsCopy[i]?.RecruitingArabic : this.sharedService.savedJobsCopy[i]?.recruitingId;
          this.savedJobs[i].JobLocation = this.sharedService.savedJobsCopy[i]?.jobLocationArabic ? this.sharedService.savedJobsCopy[i]?.jobLocationArabic : this.sharedService.savedJobsCopy[i]?.JobLocation;
          this.savedJobs[i].JobType = this.sharedService.savedJobsCopy[i]?.JobTypeArabic ? this.sharedService.savedJobsCopy[i]?.JobTypeArabic : this.sharedService.savedJobsCopy[i]?.JobType;
        }
      } else {
        this.savedJobs = this.sharedService.DeepCopyObject(this.sharedService.savedJobsCopy);
      }     
    }
}
}
