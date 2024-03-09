import { Component, Input, OnInit } from '@angular/core';
import { Education } from '../models/education';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { CompetenciesCommonService } from './../services/competencies-common.service';
import { DatePipe } from '@angular/common';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit{
  public completed: boolean = true;
  public sidenavOpen: boolean = false;
  public isFile: boolean = false;
  fileList:any[]=[]
  title = 'angular';
  educations: Education[] = [];
  selectedEducation!:Education;
  activeIndex: number = -1;
  isEdit: boolean = false;
  personRecId!:number;
  @Input() isOnboarding : boolean = false;

  constructor(private toastrService: ToastrService,
    private lookUpService:AppLookUpService,
    private deleteModal: DeleteModalComponentService,
    public translationService: TranslationAlignmentService,
    public sharedService: SharedService,
    private datePipe: DatePipe){
      this.personRecId = Number(localStorage.getItem('applicantPersonRecid'));
      this.translationService.languageChange.subscribe(x => {
        this.translationService.isTranslate = x;
        this.EducationListLanguageChanges();
      });
    }
  
  ngOnInit(){
    this.GetEducationList();
  }

  AddEducation(){
    this.selectedEducation = new Object() as Education;
    this.OpenSidenav();
  }

  async GetEducationList(){
    let educationResponse = await this.lookUpService.GetEducationList(this.personRecId);
    if(educationResponse?.parmApplicantEducationList){
      this.educations = educationResponse.parmApplicantEducationList;
      this.sharedService.educationListCopy = this.sharedService.DeepCopyObject(educationResponse.parmApplicantEducationList);
    }
    this.EducationListLanguageChanges();
  }
  OpenSidenav() {
    this.sidenavOpen = true;
    document.body.style.overflow = 'hidden';
  }

  CloseSidenav() {
    this.sidenavOpen = false;
    document.body.style.overflow = 'auto';
  }

  EditEducation(education:Education){
    this.selectedEducation = education;
    this.OpenSidenav();
  }

  async EducationAdded(education:Education){
    let educationData: Education = {
      ...education,
      CreditBasis: Number(education.CreditBasis) ?? 2,
      applicantPersonRecId: Number(localStorage.getItem('applicantPersonRecid')),
      HRMDuration: 4.0,
      RecId: 0,
      PeriodUnit: "Years",
      StartDate: this.datePipe.transform(education.StartDate, "yyyy-MM-dd") ?? '',
      EndDate: this.datePipe.transform(education.EndDate, "yyyy-MM-dd") ?? ''
    }
    let response;
    if (education?.RecId > 0) {
      educationData = education;
      response = await this.lookUpService.EditEducation(educationData);
    } else {
      response = await this.lookUpService.CreateEducation(educationData);
    }
    if (response?.Status) {
      this.toastrService.success(response?.Message);
      await this.GetEducationList();
      this.CloseSidenav();
    } else {
      this.toastrService.error(response?.Message);
    }
  }

  Delete(selectededucation:Education) {
    const data = `Are you sure you want to do delete this?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('applicantPersonRecid'));
        let response:any = await this.lookUpService.DeleteEducation(selectededucation?.RecId ,applicantPersonRecId);
        if(response?.Status){
          this.toastrService.success(response?.Message);
          this.GetEducationList();
        }else{
          this.toastrService.error(response?.Message);
        }
      }
    });
  }
  EducationListLanguageChanges() {
    if (this.educations?.length > 0) {
      if (this.translationService.isTranslate) {
        for(let i = 0; i < this.educations?.length; i++) {
          this.educations[i].Description = this.sharedService.educationListCopy[i]?.disciplineArabic ? this.sharedService.educationListCopy[i]?.disciplineArabic : this.sharedService.educationListCopy[i]?.Description;
          this.educations[i].EducationDisciplineRecId = this.sharedService.educationListCopy[i]?.educationDescriptionAr ? this.sharedService.educationListCopy[i]?.educationDescriptionAr : this.sharedService.educationListCopy[i]?.EducationDisciplineRecId;
        }
      } else {
        this.educations = this.sharedService.DeepCopyObject(this.sharedService.educationListCopy);
      }     
    }
  }
}
