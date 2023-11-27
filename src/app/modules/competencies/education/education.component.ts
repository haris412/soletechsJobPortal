import { Component, OnInit } from '@angular/core';
import { Education } from '../models/education';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponentService } from 'src/app/shared/delete-modal/delete-modal.service';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { CompetenciesCommonService } from './../services/competencies-common.service';
import { DatePipe } from '@angular/common';

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

  constructor(private toastrService: ToastrService,
    private lookUpService:AppLookUpService,
    private deleteModal: DeleteModalComponentService,
    private competenciesServie:CompetenciesCommonService,
    private datePipe: DatePipe){
      this.personRecId = Number(localStorage.getItem('recId'));
    }
  
  ngOnInit(){
    this.GetEducationList();
  }

  async GetEducationList(){
    let educationResponse = await this.lookUpService.GetEducationList(this.personRecId);
    if(educationResponse?.parmApplicantEducationList?.length > 0){
      this.educations = educationResponse.parmApplicantEducationList;
    }
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
    let educationData :Education = {
      ...education,
      CreditBasis:Number(education.CreditBasis) ?? 2 ,
      applicantPersonRecId:Number(localStorage.getItem('recId')),
      HRMDuration:4.0,
      RecId:0,
      PeriodUnit:"Years",
      StartDate:this.datePipe.transform(education.StartDate,"yyyy-MM-dd") ?? '',
      EndDate:this.datePipe.transform(education.EndDate,"yyyy-MM-dd") ?? ''
    }
    let response;
    if (education?.RecId > 0) {
      educationData = education;
      response = await this.lookUpService.EditEducation(educationData);
    } else {
      response = await this.lookUpService.CreateEducation(educationData);
    }
    if(response?.Status){
    this.toastrService.success(response?.Message);
    await this.GetEducationList();
    this.CloseSidenav();
    }
  }

  Delete(selectededucation:Education) {
    const data = `Are you sure you want to do delete this education?`;
    const dialogRef = this.deleteModal.openDialog(data);
    dialogRef.afterClosed().subscribe(async (dialogResult: any) => {
      if (dialogResult) {
        let applicantPersonRecId = Number(localStorage.getItem('recId'));
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
}
