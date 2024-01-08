import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivityDurationGroupByData, ApplicantOnboardingTasks } from 'src/app/models/ApplicantOnboardingTasks';
import { ActivityDuration } from 'src/app/app-enums/app-enums';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';


@Component({
  selector: 'app-applicant-onboarding',
  templateUrl: './applicant-onboarding.component.html',
  styleUrls: ['./applicant-onboarding.component.scss']
})
export class ApplicantOnboardingComponent {
  public identificationisActive: boolean = true;
  public identificationCompleted: boolean = false;
  public documentsCompleted: boolean = false;
  public documentsisActive: boolean = false;
  public medicalCompleted: boolean = false;
  public medicalisActive: boolean = false;
  public dependentsCompleted: boolean = false;
  public dependentsisActive: boolean = false;
  public addressCompleted: boolean = false;
  public addressisActive: boolean = false;
  public emergencyContactCompleted: boolean = false;
  public emergencyContactisActive: boolean = false;
  public sidenavOpen: boolean = false;
  
  title = 'angular';
  index: Number = 1;
  ActivityDuration = ActivityDuration;

  constructor(private location: Location,
    private service:AppLookUpService,
    public shared: SharedService,
    public translationService: TranslationAlignmentService,
    ) {
      this.translationService.languageChange.subscribe(x=> {
        this.OnboardingJobActionLanguageChanges();
      });
     }

  async ngOnInit() {
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let applicationId = localStorage.getItem('applicationId') ?? '';
    let boardingData = await this.service.GetApplicationOnBoardingList(applicantId,applicationId);
    this.shared.onBoardingData = boardingData?.listOnboarding?.parmRecruitment_ApplicationOnBoardingList as ApplicantOnboardingTasks[];
    const group = this.shared.onBoardingData?.reduce((acc: any, curr) => {
      let key = curr.ActivityDuration;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
    if (group != undefined) {
      this.shared.durationGroups = [];
      let keies = Object.keys(group);
      for(let item = 0; item < keies.length; item++) {
        let durationData = new ActivityDurationGroupByData();
        durationData.ActivityDuration = keies[item];
        durationData.applicantOnboardingTasks = group[keies[item]];
        if (durationData.applicantOnboardingTasks.length > 0) {
          durationData.applicantOnboardingTasks[0].Active = true;
        }
        this.shared.durationGroups.push(durationData);
      }
    }

    var data = 2;
  }

  OpenSidenav() {
    this.sidenavOpen = true;
  }

  CloseSidenav() {
    this.sidenavOpen = false;
  }

  Next(durationIndex: string) {
    let index = this.shared.durationGroups.find(x => x.ActivityDuration == durationIndex)?.applicantOnboardingTasks.findIndex(y => y.Active);
    let task = this.shared.durationGroups.find(x => x.ActivityDuration == durationIndex)?.applicantOnboardingTasks.find(y => y.Active);
    if (task != undefined && index != undefined) {
      task.Completed = true;
      let duration = this.shared.durationGroups.find(x => x.ActivityDuration == durationIndex);
      if (duration != undefined) {
        duration.applicantOnboardingTasks.forEach(x => x.Active = false);
        let taskData = duration.applicantOnboardingTasks[index + 1];
        if (taskData) {
          taskData.Active = true;
        }
      }
    }
  }
  Back(durationIndex: string) {
    let index = this.shared.durationGroups.find(x => x.ActivityDuration == durationIndex)?.applicantOnboardingTasks.findIndex(y => y.Active);
    if (index != undefined) {
      let duration = this.shared.durationGroups.find(x => x.ActivityDuration == durationIndex);
      if (duration != undefined) {
        duration.applicantOnboardingTasks.forEach(x => x.Active = false);
        let taskData = duration.applicantOnboardingTasks[index - 1];
        if (taskData) {
          taskData.Active = true;
        }
      }
    }
  }
  GoBack() {
    this.location.back();
  }
  GoToTab(group: number, index: number) {
    this.shared.durationGroups[group].applicantOnboardingTasks.forEach(x => x.Active = false);
    this.shared.durationGroups[group].applicantOnboardingTasks[index].Active = true;
  }
  Discard() { 
    
  }

  getEnumKeyByEnumValue(enumValue: string) {
    let key = +enumValue;
    let returnValue = "";
    if (enumValue == ActivityDuration.BeforeJoining.toString()) {
      returnValue = "Before Joining";
    } else if (enumValue == ActivityDuration.FirstDay.toString()) {
      returnValue = "First Day";
    } else {
      returnValue = "In 30 Days";
    }
    return returnValue;
  }
  OnboardingJobActionLanguageChanges() {
    // if (this.selectedJob !== null) {
    //   if (this.translationService.isTranslate) {
    //     this.selectedJob.Description = this.sharedService.selectedJobActions?.jobArabic ? this.sharedService.selectedJobActions?.jobArabic : this.sharedService.selectedJobActions?.Description;
    //     this.selectedJob.Title = this.sharedService.selectedJobActions?.JobArabic ? this.sharedService.selectedJobActions?.JobArabic : this.sharedService.selectedJobActions?.Title;
    //     this.selectedJob.JobLocation = this.sharedService.selectedJobActions?.jobLocationArabic ? this.sharedService.selectedJobActions?.jobLocationArabic : this.sharedService.selectedJobActions?.JobLocation;
    //     this.selectedJob.JobAd = this.sharedService.selectedJobActions?.jobadTextArabic ? this.sharedService.selectedJobActions?.jobadTextArabic : this.sharedService.selectedJobActions?.JobAd;
    //     this.selectedJob.Overview = this.sharedService.selectedJobActions?.ArabicOverview ? this.sharedService.selectedJobActions?.ArabicOverview : this.sharedService.selectedJobActions?.Overview; 
    //     this.selectedJob.jobType  = this.sharedService.selectedJobActions?.JobTypeArabic ? this.sharedService.selectedJobActions?.JobTypeArabic : this.sharedService.selectedJobActions?.JobType; 
    //   } else {
    //     this.selectedJob = this.sharedService.DeepCopyObject(this.sharedService.selectedJobActions);
    //   }     
    // }
  }
}
