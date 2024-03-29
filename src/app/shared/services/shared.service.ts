import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { AppLookUpService } from "src/app/app-services/app-look-up.service";
import { ActivityDurationGroupByData, ApplicantOnboardingTasks } from "src/app/models/ApplicantOnboardingTasks";
import { LookupParameters } from "src/app/models/look-up.model";
import { SaveJob } from "src/app/models/saveJob.model";
import { CompetenciesCommonService } from "src/app/modules/competencies-common/components/services/competencies-common.service";

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  token: string = '';
  public email: string = "";
  public isUserLoggedIn: boolean = false;
  public applied: boolean = false;
  public appliedJobs: any[] = [];
  public jobDetail: any;
  public skillsListCopy:any;
  public educationListCopy:any;
  public certificateListCopy:any;
  public jobs: any;
  public appliedJobsCopy: any[] = [];
  public savedJobsCopy: any[] = [];
  public selectedJobActions: any;
  public applicantonHospitalBoardingList: any[] = [];
  public onBoardingData: ApplicantOnboardingTasks[] = [];
  durationGroups: ActivityDurationGroupByData[] = [];
  public onboardingLanguageChangeData: ActivityDurationGroupByData[] = [];

  public showOfferBasicLanguageData: any;
  public showOfferFinanceLanguageData: any;
  public showOfferBenefitsLanguageData: any;

  discardProfileInfo: EventEmitter<boolean> = new EventEmitter();

  constructor(public lookupService: AppLookUpService,
    private competenciesService: CompetenciesCommonService,
    public toastrService: ToastrService,
    private router: Router) { }

  GetToken() {
    return localStorage.getItem('token');
  }

  SetToken(token: string) {
    localStorage.setItem('token', token);
  }

  DeepCopyObject(data: any) {
    var returnData = JSON.parse(JSON.stringify(data));
    return returnData;
  }


  async SaveJob(job: any) {
    if (localStorage.getItem("email")) {
      let applicantId = localStorage.getItem("applicantId") ?? '';
      try {
        let jobData: SaveJob = {
          applicantId: applicantId,
          jobId: job?.jobId
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
  async GetAppliedJobs() {
    let applicantId = localStorage.getItem('applicantId') ?? '';
    let response = await this.lookupService.MyApplicationJobList(applicantId);
    if (response) {
      this.appliedJobs = response?.parmRecruitmentApplicationJobList;
    }
  }

  async GetLookUps() {
    let params: LookupParameters = {
      dataAreaId: 'USMF',
      languageId: 'en-us'
    }
    const lookUps = await forkJoin({
      skills: this.lookupService.GetSkillLookup(params),
      skillLevel: this.lookupService.GetRatingLevelLookupList(params),
      educationInstitution: this.lookupService.GetEducationInstitutionLookupList(params),
      educationDiscipline: this.lookupService.GetEducationDisciplineLookupList(params),
      certificateTypes: this.lookupService.getCertificateTypeLookUpList(params),
      educationLevel: this.lookupService.GetEducationLevelLookupList(params),
    }).toPromise();
    lookUps?.skills?.parmList?.forEach((skills: any) => {
      let data = new Object() as any;
      data.name = skills.Description;
      data.value = skills.Id;
      this.competenciesService.skillsList.push(data);
    }
    );
    lookUps?.skills?.parmList?.forEach((skills: any) => {
      let data = new Object() as any;
      data.name = skills.OtherLine ? skills.OtherLine : skills.Description;
      data.value = skills.Id;
      this.competenciesService.skillsArabicList.push(data);
    }
    );
    // lookUps?.skillLevel?.parmList?.forEach((skillLevel: any) => {
    //   let data = new Object() as any;
    //   data.name = skillLevel.Description;
    //   data.value = skillLevel.Id;
    //   this.competenciesService.skillLevelList.push(data);
    // }
    // );
    lookUps?.educationInstitution?.parmList?.forEach((educationInstitution: any) => {
      let data = new Object() as any;
      data.name = educationInstitution.Description;
      data.value = educationInstitution.Id;
      this.competenciesService.educationInstitutionList.push(data);
    }
    );
    lookUps?.educationInstitution?.parmList?.forEach((educationInstitution: any) => {
      let data = new Object() as any;
      data.name = educationInstitution.OtherLine ? educationInstitution.OtherLine : educationInstitution.Description;
      data.value = educationInstitution.Id;
      this.competenciesService.educationInstitutionArabicList.push(data);
    }
    );
    lookUps?.educationDiscipline?.parmList?.forEach((educationDiscipline: any) => {
      let data = new Object() as any;
      data.name = educationDiscipline.Description;
      data.value = educationDiscipline.Id;
      this.competenciesService.educationDesciplineList.push(data);
    }
    );
    lookUps?.educationDiscipline?.parmList?.forEach((educationDiscipline: any) => {
      let data = new Object() as any;
      data.name = educationDiscipline.Other ? educationDiscipline.Other : educationDiscipline.Description;
      data.value = educationDiscipline.Id;
      this.competenciesService.educationDeciplineArabicList.push(data);
    }
    );
    lookUps?.certificateTypes?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.competenciesService.certificateTypesList.push(data);
    }
    );
    lookUps?.certificateTypes?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Other ? projects.Other : projects.Description;
      data.value = projects.Id;
      this.competenciesService.certificateTypesArabicList.push(data);
    }
    );
    lookUps?.educationLevel?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Description;
      data.value = projects.Id;
      this.competenciesService.educationLevelList.push(data);
    }
    );
    lookUps?.educationLevel?.parmList?.forEach((projects: any) => {
      let data = new Object() as any;
      data.name = projects.Other ? projects.Other :  projects.Description;
      data.value = projects.Id;
      this.competenciesService.educationLevelArabicList.push(data);
     }
    );
  }
}